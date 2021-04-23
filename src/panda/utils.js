import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { supportedPools } from './lib/constants'
import usePanda from '../hooks/usePanda'

BigNumber.config({
	EXPONENTIAL_AT: 1000,
	DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
	STAKING: {
		DEFAULT: 200000,
		SNX: 850000,
	},
}

const panda = usePanda()

export const getMasterChefAddress = (panda) => {
	return panda && panda.masterChefAddress
}

export const getWbnbPriceAddress = (panda) => {
	return panda && panda.wbnbPriceAddress
}

export const getPandaPriceAddress = (panda) => {
	return panda && panda.pndaPriceAddress
}

export const getPandaAddress = (panda) => {
	return panda && panda.pndaAddress
}
export const getWbnbContract = (panda) => {
	return panda && panda.contracts && panda.contracts.wbnb
}

export const getWbnbPriceContract = (panda) => {
	return panda && panda.contracts && panda.contracts.wbnbPrice
}

export const getPandaPriceContract = (panda) => {
	return panda && panda.contracts && panda.contracts.pndaPrice
}

export const getMasterChefContract = (panda) => {
	return panda && panda.contracts && panda.contracts.masterChef
}
export const getPandaContract = (panda) => {
	return panda && panda.contracts && panda.contracts.panda
}

export const getBambooStakingContract = (panda) => {
	return panda && panda.contracts && panda.contracts.bambooStaking
}  

export const getFarms = (panda) => {
	return panda
		? panda.contracts.pools.map(
				({
					pid,
					name,
					symbol,
					icon,
					tokenAddress,
					tokenDecimals,
					tokenSymbol,
					tokenContract,
					lpAddress,
					lpContract,
					refUrl,
					poolType,
				}) => ({
					pid,
					id: symbol,
					name,
					lpToken: symbol,
					lpTokenAddress: lpAddress,
					lpContract,
					tokenAddress,
					tokenDecimals,
					tokenSymbol,
					tokenContract,
					earnToken: 'PNDA',
					earnTokenAddress: panda.contracts.panda.options.address,
					icon,
					refUrl,
					poolType,
				}),
		  )
		: []
}

export const getPoolWeight = async (masterChefContract, pid) => {
	const [{ allocPoint }, totalAllocPoint] = await Promise.all([
		masterChefContract.methods.poolInfo(pid).call(),
		masterChefContract.methods.totalAllocPoint().call(),
	])

	return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (masterChefContract, pid, account) => {
	return masterChefContract.methods.pendingReward(pid, account).call()
}

export const getLockedEarned = async (pndaContract, account) => {
	return pndaContract.methods.lockOf(account).call()
}

export const getTotalLPWbnbValue = async (
	masterChefContract,
	wbnbContract,
	lpContract,
	tokenContract,
	tokenDecimals,
	pid,
) => {
	const [
		tokenAmountWholeLP,
		balance,
		totalSupply,
		lpContractWbnb,
		poolWeight,
	] = await Promise.all([
		tokenContract.methods.balanceOf(lpContract.options.address).call(),
		lpContract.methods.balanceOf(masterChefContract.options.address).call(),
		lpContract.methods.totalSupply().call(),
		wbnbContract.methods.balanceOf(lpContract.options.address).call(),
		getPoolWeight(masterChefContract, pid),
	])

	// Return p1 * w1 * 2
	const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
	const lpWbnbWorth = new BigNumber(lpContractWbnb)
	const totalLpWbnbValue = portionLp.times(lpWbnbWorth).times(new BigNumber(2))
	// Calculate
	const tokenAmount = new BigNumber(tokenAmountWholeLP)
		.times(portionLp)
		.div(new BigNumber(10).pow(tokenDecimals))

	const wbnbAmount = new BigNumber(lpContractWbnb)
		.times(portionLp)
		.div(new BigNumber(10).pow(18))
	return {
		tokenAmount,
		wbnbAmount,
		totalWbnbValue: totalLpWbnbValue.div(new BigNumber(10).pow(18)),
		tokenPriceInWbnb: wbnbAmount.div(tokenAmount),
		poolWeight: poolWeight,
	}
}

export const approve = async (lpContract, masterChefContract, account) => {
	return lpContract.methods
		.approve(masterChefContract.options.address, ethers.constants.MaxUint256)
		.send({ from: account })
}

export const getBambooSupply = async () => {
	return new BigNumber(await panda.contracts.BambooStaking.methods.totalSupply().call())
}    

export const stake = async (masterChefContract, pid, amount, account, ref) => {
	return masterChefContract.methods
		.deposit(pid, ethers.utils.parseUnits(amount, 18), ref)
		.send({ from: account })
		.on('transactionHash', (tx) => {
			console.log(tx)
			return tx.transactionHash
		})
}

export const unstake = async (
	masterChefContract,
	pid,
	amount,
	account,
	ref,
) => {
	return masterChefContract.methods
		.withdraw(pid, ethers.utils.parseUnits(amount, 18), ref)
		.send({ from: account })
		.on('transactionHash', (tx) => {
			console.log(tx)
			return tx.transactionHash
		})
}
export const harvest = async (masterChefContract, pid, account) => {
	return masterChefContract.methods
		.claimReward(pid)
		.send({ from: account })
		.on('transactionHash', (tx) => {
			console.log(tx)
			return tx.transactionHash
		})
}

export const getStaked = async (masterChefContract, pid, account) => {
	try {
		const { amount } = await masterChefContract.methods
			.userInfo(pid, account)
			.call()
		return new BigNumber(amount)
	} catch {
		return new BigNumber(0)
	}
}

export const getWbnbPrice = async (panda) => {
	console.log(panda)
	const amount = await panda.contracts.wbnbPrice.methods.latestAnswer().call()
	return new BigNumber(amount)
}

export const getPandaPrice = async (panda) => {
	const addr = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
	const amount = await panda.contracts.pndaPrice.methods
		.consult(addr.toString(), 1)
		.call()
	return new BigNumber(amount)
}

export const getPandaSupply = async (panda) => {
	return new BigNumber(await panda.contracts.panda.methods.totalSupply().call())
}

export const getReferrals = async (masterChefContract, account) => {
	return await masterChefContract.methods.getGlobalRefAmount(account).call()
}

export function getRefUrl() {
	var refer = '0x0000000000000000000000000000000000000000'
	const urlParams = new URLSearchParams(window.location.search)
	if (urlParams.has('ref')) {
		refer = urlParams.get('ref')
	}
	console.log(refer)

	return refer
}

export const redeem = async (masterChefContract, account) => {
	let now = new Date().getTime() / 1000
	if (now >= 1597172400) {
		return masterChefContract.methods
			.exit()
			.send({ from: account })
			.on('transactionHash', (tx) => {
				console.log(tx)
				return tx.transactionHash
			})
	} else {
		alert('pool not active')
	}
}

export const enter = async (contract, amount, account) => {
	debugger
	return contract.methods
		.enter(
			new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
		)
		.send({ from: account })
		.on('transactionHash', (tx) => {
		  console.log(tx)
		  return tx.transactionHash
		})
  }  

export const leave = async (contract, amount, account) => {
	return contract.methods
		.leave(
			new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
		)
		.send({ from: account })
		.on('transactionHash', (tx) => {
		  console.log(tx)
		  return tx.transactionHash
		})
  }
  