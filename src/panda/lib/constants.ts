import BigNumber from 'bignumber.js/bignumber'
import { PoolType } from '../../contexts/Farms/types'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const addressMap = {
  uniswapFactory: '0x9Ad32bf5DaFe152Cbe027398219611DB4E8753B3',
  uniswapFactoryV2: '0x9Ad32bf5DaFe152Cbe027398219611DB4E8753B3',
  BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  PNDA: '0x3B72Ac46888f72dD6a6B2076Ca96fcc18e75a935',
  BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  ETH: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  USDC: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  DAI: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
  CAKE: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  ADA: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
  DOT: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
  XRP: '0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe',
  LTC: '0x4338665cbb7b2485a8855a139b75d5e34ab0db94',
  LINK: '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd',
  DOGE: '0xba2ae424d960c26247dd6c32edc70b295c744c43',
  UNI: '0xbf5140a22578168fd562dccf235e5d43a02ce9b1',
  EOS: '0x56b6fb708fc5732dec1afc8d8556423a2edccbd6',
  ATOM: '0x0eb3a705fc54725037cc9e008bdede697f62f335',
  XTZ: '0x16939ef78684453bfdfb47825f8a5f714f12623a',
  SNX: '0x9ac983826058b8a9c7aa1c9171441191232e8404',
  MKR: '0x5f0da599bb2cccfcf6fdfd7d81743b6020864350',
  COMP: '0x52ce071bd9b1c4b00a0b92d298c512478cad67e8',
  YFI: '0x88f1a5ae2a3bf98aeaf342d26b30a79438c9142e',
  NEAR: '0x1fa4a73a3f0133f0025378af00236f3abdee5d63',
  ONT: '0xfd7b3a77848f1c2d67e05e54d78d174a0c850335',
  BAT: '0x101d82428437127bf1608f699cd651e6abf9766e',
  VAI: '0x4bd17003473389a42daf6a0a729f6fdb328bbbd7',
  PAX: '0xb7f8cd00c5a06c0537e2abff0b58033d02e5e094',
  XVS: '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63',
  BTCB: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
  UST: '0x23396cf899ca06c4472205fc903bdb4de249d6fc',
  BAND: '0xad6caeb32cd2c308980a548bd0bc5aa4306c6c18',
  SFP: '0xd41fdb03ba84762dd66a0af1a6c8540ff1ba5dfb',
  ALPHA: '0xa1faa113cbe53436df28ff0aee54275c13b40975',
  SXP: '0x47bead2563dcbf3bf2c9407fea4dc236faba485a',
  vBTC: '0x882c173bc7ff3b7786ca16dfed3dfffb9ee7847b',
  ANKR: '0xf307910a4c7bbc79691fd374889b36d8531b08e3',
  TWT: '0x4b0f1812e5df2a09796481ff14017e6005508003',
  LINA: '0x762539b45a1dcce3d36d080f74d1aed37844b878',
  PROM: '0xaf53d56ff99f1322515e54fdde93ff8b3b7dafd5',
  ELF: '0xa3f020a5c92e15be13caf0ee5c95cf79585eecc9',
  MATH: '0xf218184af829cf2b0019f8e6f0b2423498a36983',
  AUTO: '0xa184088a740c695e156f91f5cc086a06bb78b827',
  REEF: '0xf21768ccbc73ea5b6fd3c687208a7c2def2d966e',
  CREAM: '0xd4cb328a82bdf5f03eb737f37fa6b370aef3e888',
  vUSDC: '0xeca88125a5adbe82614ffc12d0db554e2e2867c8',
  SPARTA: '0xe4ae305ebe1abe663f261bc00534067c80ad677c',
  CTK: '0xa8c2b8eec3d368c0253ad3dae65a5f2bbb89c929',
  BURGER: '0xae9269f27437f0fcbc232d39ec814844a51d6b8f',
  vBUSD: '0x95c78222b3d6e262426483d42cfa53685a67ab9d',
  BRY: '0xf859Bf77cBe8699013d6Dbc7C2b926Aaf307F830',
  STAX: '0x0da6ed8b13214ff28e9ca979dd37439e8a88f6c4',
  vUSDT: '0xfd5840cd36d94d7229439859c0112a4185bc0255',
  JulD: '0x5a41f637c3f7553dba6ddc2d3ca92641096577ea',
  FOR: '0x658a109c5900bc6d2357c87549b651670e5b0539',
  ANY: '0xf68c9df95a18b2a5a5fa1124d79eeeffbad0b6fa',
  HELMET: '0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8',
  BIFI: '0xCa3F508B8e4Dd382eE878A314789373D80A5190A',
  BTCST: '0x78650b139471520656b9e7aa7a5e9276814a38e9',
  BSCX: '0x5ac52ee5b2a633895292ff6d8a89bb9190451587',
  UNFI: '0x728c5bac3c3e370e372fc4671f9ef6916b814d8b',
  BUX: '0x211ffbe424b90e25a15531ca322adf1559779e45',
  MDS: '0x242e46490397acca94ed930f2c4edf16250237fa',
  HGET: '0xc7d8d35eba58a0935ff2d5a33df105dd9f071731',
  BAO: '0x47eaf5f54d79d5c2b6537a90a0c58a534ab51c8c',
  FRONT: '0x928e55dab735aa8260af3cedada18b5f70c72f1b',
  MIR: '0x5b6dcf557e2abe2323c48445e8cc948910d8c2c9',
  ZEE: '0x44754455564474A89358B2C2265883DF993b12F0',
  MATTER: '0x1c9491865a1de77c5b6e19d2e6a5f1d7a6f2b25f',
  BLK: '0x63870a18b6e42b01ef1ad8a2302ef50b7132054f',
  POLS: '0x7e624fa0e1c4abfd309cc15719b7e2580887f570',
  TLM: '0x2222227e22102fe3322098e4cbfe18cfebd57c95',
  UBXT: '0xbbeb90cfb6fafa1f69aa130b7341089abeef5811',
  BUNNY: '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51',
  BAMBOO: '0xecb037cc672Fb2b53466Bbce986880149F79245B',
  RHINO: '0xD2ECa3cff5F09Cfc9C425167d12F0a005Fc97c8c',
}

export const contractAddresses = {
  panda: {
    56: '0x3B72Ac46888f72dD6a6B2076Ca96fcc18e75a935',
  },
  bamboo: {
    56: '0xecb037cc672Fb2b53466Bbce986880149F79245B',
  },
  rhinoStaking: {
    56: '0x745c8E1c0315162C33408454b48E53C9F178eB68',
  },
  rhino: {
    56: '0xD2ECa3cff5F09Cfc9C425167d12F0a005Fc97c8c',
  },
  masterChef: {
    56: '0x2c7cd9468A3F9fEfb13E1BA49E4Fee406f1C13d6',
  },
  wbnb: {
    56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  },
  wbnbPrice: {
    56: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
  },
  bambooMaker: {
    56: '0x4375e2c30C440482ac96602b0D66E5E0e668f4e3',
  },
  pndaPrice: {
    56: '',
  },
}
//
/*
BAO Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SUSHI 0xce84867c3c02b05dc570d0135103d3fb9cc19433
*/

export interface SupportedPool {
  pid: number
  lpAddresses: {
    56: string
  }
  tokenAddresses: {
    56: string
  }
  tokenDecimals: number
  name: string
  symbol: string
  tokenSymbol: string
  icon: string
  refUrl: string
  poolType?: PoolType
  // ap: any
  // price: any
  // decimals: any
}

export const supportedPools: SupportedPool[] = [
  {
    pid: 0,
    lpAddresses: {
      56: '0x3B72Ac46888f72dD6a6B2076Ca96fcc18e75a935',
    },
    tokenAddresses: {
      56: '0x3B72Ac46888f72dD6a6B2076Ca96fcc18e75a935',
    },
    tokenDecimals: 18,
    name: 'UFO',
    symbol: 'UFO',
    tokenSymbol: 'UFO',
    poolType: PoolType.ARCHIVED,
    icon: '/pnda.png',
    refUrl:
      'https://pandaswap.xyz/#/swap?outputCurrency=0x47DcC83a14aD53Ed1f13d3CaE8AA4115f07557C0',
  },
  {
    pid: 31,
    lpAddresses: {
      56: '0xecb037cc672Fb2b53466Bbce986880149F79245B',
    },
    tokenAddresses: {
      56: '0xecb037cc672Fb2b53466Bbce986880149F79245B',
    },
    tokenDecimals: 18,
    name: 'YUFO',
    symbol: 'YUFO',
    tokenSymbol: 'YUFO',
    poolType: PoolType.PNDA,
    icon: '/bamboo.png',
    refUrl:
      'https://pandaswap.xyz/#/swap?outputCurrency=0x47DcC83a14aD53Ed1f13d3CaE8AA4115f07557C0',
  },
  {
    pid: 1,
    lpAddresses: {
      56: '0x4B0F1812e5Df2A09796481Ff14017e6005508003',
    },
    tokenAddresses: {
      56: '0x4B0F1812e5Df2A09796481Ff14017e6005508003',
    },
    tokenDecimals: 18,
    name: 'TWT',
    symbol: 'TWT',
    tokenSymbol: 'TWT',
    poolType: PoolType.PNDA,
    icon: '/twt.png',
    refUrl:
      'https://pandaswap.xyz/#/swap?outputCurrency=0x47DcC83a14aD53Ed1f13d3CaE8AA4115f07557C0',
  },
  {
    pid: 32,
    lpAddresses: {
      56: '0x76a797a59ba2c17726896976b7b3747bfd1d220f',
    },
    tokenAddresses: {
      56: '0x76a797a59ba2c17726896976b7b3747bfd1d220f',
    },
    tokenDecimals: 18,
    name: 'TON',
    symbol: 'TON',
    tokenSymbol: 'TON',
    poolType: PoolType.PNDA,
    icon: '/ton.png',
    refUrl:
      'https://pandaswap.xyz/#/swap?outputCurrency=0x47DcC83a14aD53Ed1f13d3CaE8AA4115f07557C0',
  },
]
