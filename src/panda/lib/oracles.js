// const oracleAbi = require('./abi/chainoracle.json')
const abiYUFO = require('./abi/abiYUFO.json')
const abiTWT = require('./abi/abiTWT.json')
const abiTON = require('./abi/abiTON.json')

export default function (web3) {
	return [
		{
			token: 'YUFO',
			address: '0xecb037cc672Fb2b53466Bbce986880149F79245B',
			contract: new web3.eth.Contract(
				abiYUFO,
				'0xecb037cc672Fb2b53466Bbce986880149F79245B',
			),
		},
		{
			token: 'TWT',
			address: '0x4B0F1812e5Df2A09796481Ff14017e6005508003',
			contract: new web3.eth.Contract(
				abiTWT,
				'0x4B0F1812e5Df2A09796481Ff14017e6005508003',
			),
		},
		{
			token: 'TONCOIN',
			address: '0x76a797a59ba2c17726896976b7b3747bfd1d220f',
			contract: new web3.eth.Contract(
				abiTON,
				'0x76a797a59ba2c17726896976b7b3747bfd1d220f',
			),
		},
	]
}
