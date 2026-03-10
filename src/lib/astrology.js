/**
 * 占星术算命系统
 * 
 * 基于西方占星学：
 * - 太阳星座（根据出生日期）
 * - 月亮星座（根据出生日期和时间）
 * - 上升星座（需要精确出生时间，这里简化处理）
 * - 今日行星运行影响
 */

// 十二星座
const ZODIAC_SIGNS = {
  aries: { name: '白羊座', symbol: '♈', element: '火', ruler: '火星', dates: '3/21-4/19', traits: '勇敢、直接、热情、冲动' },
  taurus: { name: '金牛座', symbol: '♉', element: '土', ruler: '金星', dates: '4/20-5/20', traits: '稳重、务实、固执、享乐' },
  gemini: { name: '双子座', symbol: '♊', element: '风', ruler: '水星', dates: '5/21-6/20', traits: '聪明、多变、好奇、健谈' },
  cancer: { name: '巨蟹座', symbol: '♋', element: '水', ruler: '月亮', dates: '6/21-7/22', traits: '敏感、顾家、情绪化、保护' },
  leo: { name: '狮子座', symbol: '♌', element: '火', ruler: '太阳', dates: '7/23-8/22', traits: '自信、慷慨、戏剧化、领导' },
  virgo: { name: '处女座', symbol: '♍', element: '土', ruler: '水星', dates: '8/23-9/22', traits: '细心、完美主义、分析、服务' },
  libra: { name: '天秤座', symbol: '♎', element: '风', ruler: '金星', dates: '9/23-10/22', traits: '和谐、公正、犹豫、优雅' },
  scorpio: { name: '天蝎座', symbol: '♏', element: '水', ruler: '冥王星', dates: '10/23-11/21', traits: '神秘、强烈、执着、洞察' },
  sagittarius: { name: '射手座', symbol: '♐', element: '火', ruler: '木星', dates: '11/22-12/21', traits: '乐观、自由、哲学、冒险' },
  capricorn: { name: '摩羯座', symbol: '♑', element: '土', ruler: '土星', dates: '12/22-1/19', traits: '野心、纪律、实际、严肃' },
  aquarius: { name: '水瓶座', symbol: '♒', element: '风', ruler: '天王星', dates: '1/20-2/18', traits: '独立、创新、人道、叛逆' },
  pisces: { name: '双鱼座', symbol: '♓', element: '水', ruler: '海王星', dates: '2/19-3/20', traits: '直觉、梦幻、同情、逃避' }
}

// 行星
const PLANETS = {
  sun: { name: '太阳', symbol: '☉', meaning: '自我、核心、生命力' },
  moon: { name: '月亮', symbol: '☽', meaning: '情感、潜意识、习惯' },
  mercury: { name: '水星', symbol: '☿', meaning: '思维、沟通、学习' },
  venus: { name: '金星', symbol: '♀', meaning: '爱情、美感、价值' },
  mars: { name: '火星', symbol: '♂', meaning: '行动、欲望、冲突' },
  jupiter: { name: '木星', symbol: '♃', meaning: '扩张、幸运、哲学' },
  saturn: { name: '土星', symbol: '♄', meaning: '限制、责任、结构' },
  uranus: { name: '天王星', symbol: '♅', meaning: '变革、自由、意外' },
  neptune: { name: '海王星', symbol: '♆', meaning: '梦幻、灵感、迷惑' },
  pluto: { name: '冥王星', symbol: '♇', meaning: '转化、深度、权力' }
}

// 今日行星位置（简化版，根据日期计算）
function getTodayPlanets(today) {
  const date = new Date(today)
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
  
  // 简化：根据日期计算行星所在星座
  const getSignByOffset = (offset) => {
    const signs = Object.keys(ZODIAC_SIGNS)
    return signs[(Math.floor(dayOfYear / 30) + offset) % 12]
  }
  
  return {
    sun: getSignByOffset(0),      // 太阳当前星座
    mercury: getSignByOffset(1),  // 水星
    venus: getSignByOffset(2),    // 金星
    mars: getSignByOffset(3),     // 火星
    jupiter: getSignByOffset(-1), // 木星（移动慢）
    saturn: getSignByOffset(-2)   // 土星（移动很慢）
  }
}

// 根据出生日期计算太阳星座
function getSunSign(birthDate) {
  const date = new Date(birthDate)
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  // 星座日期范围
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini'
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra'
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio'
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn'
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius'
  return 'pisces' // 2/19 - 3/20
}

// 根据出生时辰计算月亮星座（简化版）
function getMoonSign(birthDate, shiChenKey) {
  const sunSign = getSunSign(birthDate)
  const signs = Object.keys(ZODIAC_SIGNS)
  const sunIndex = signs.indexOf(sunSign)
  
  // 月亮星座大约在太阳星座前后1-2个星座
  const shiChenMap = {
    zi: 0, chou: 1, yin: 2, mao: 3, chen: 4, si: 5,
    wu: 6, wei: 7, shen: 8, you: 9, xu: 10, hai: 11
  }
  
  const offset = (shiChenMap[shiChenKey] || 0) % 3 - 1
  const moonIndex = (sunIndex + offset + 12) % 12
  
  return signs[moonIndex]
}

// 根据时辰计算上升星座（简化版）
function getRisingSign(shiChenKey) {
  const signs = Object.keys(ZODIAC_SIGNS)
  const shiChenMap = {
    zi: 0, chou: 1, yin: 2, mao: 3, chen: 4, si: 5,
    wu: 6, wei: 7, shen: 8, you: 9, xu: 10, hai: 11
  }
  
  return signs[shiChenMap[shiChenKey] || 0]
}

// 今日运势解读库
const DAILY_READINGS = {
  // 行星相位影响
  aspects: [
    { name: '太阳三分木星', effect: '好运加持，事业财运上升', type: 'positive' },
    { name: '金星六分火星', effect: '感情运势旺盛，魅力四射', type: 'positive' },
    { name: '水星合相太阳', effect: '思维清晰，沟通顺畅', type: 'positive' },
    { name: '月亮对分土星', effect: '情绪可能低落，需自我调节', type: 'challenging' },
    { name: '火星四分天王星', effect: '行动需谨慎，避免冲动', type: 'challenging' },
    { name: '金星三分海王星', effect: '浪漫能量增强，艺术灵感涌现', type: 'positive' },
    { name: '太阳六分土星', effect: '稳扎稳打，适合处理重要事务', type: 'neutral' },
    { name: '木星对分水星', effect: '想法多但需注意细节', type: 'neutral' }
  ],
  
  // 星座今日运势
  signReadings: {
    aries: { overview: '今日充满活力，适合开展新项目。火星的能量让你行动力十足，但需注意不要过于冲动。', lucky: '红色', number: 9 },
    taurus: { overview: '今日财运平稳，适合处理财务事宜。金星的眷顾让你在人际关系中游刃有余。', lucky: '绿色', number: 6 },
    gemini: { overview: '今日思维活跃，沟通能力出色。水星的影响让你灵感不断，适合学习新知识。', lucky: '黄色', number: 5 },
    cancer: { overview: '今日情绪敏感，适合在家休息或与家人相处。月亮的守护让你直觉敏锐。', lucky: '银色', number: 2 },
    leo: { overview: '今日魅力四射，适合展现才华。太阳的能量让你自信满满，但需注意谦逊。', lucky: '金色', number: 1 },
    virgo: { overview: '今日细心周到，适合处理细节工作。水星的影响让你分析能力出众。', lucky: '藏青色', number: 5 },
    libra: { overview: '今日人际关系和谐，适合社交活动。金星的眷顾让你优雅迷人。', lucky: '粉色', number: 6 },
    scorpio: { overview: '今日直觉强烈，适合深入研究。冥王星的影响让你洞察力非凡。', lucky: '暗红色', number: 8 },
    sagittarius: { overview: '今日乐观向上，适合规划未来。木星的加持让你视野开阔。', lucky: '紫色', number: 3 },
    capricorn: { overview: '今日事业运势佳，适合处理重要事务。土星的影响让你稳重可靠。', lucky: '黑色', number: 4 },
    aquarius: { overview: '今日创意无限，适合尝试新事物。天王星的能量让你与众不同。', lucky: '电蓝色', number: 7 },
    pisces: { overview: '今日灵感丰富，适合艺术创作。海王星的守护让你想象力非凡。', lucky: '海蓝色', number: 7 }
  }
}

/**
 * 获取占星术解读
 */
export function getAstrologyReading(birthDate, shiChenKey, gender) {
  const today = new Date().toISOString().split('T')[0]
  
  // 计算星盘
  const sunSign = getSunSign(birthDate)
  const moonSign = getMoonSign(birthDate, shiChenKey)
  const risingSign = getRisingSign(shiChenKey)
  const todayPlanets = getTodayPlanets(today)
  
  // 获取星座信息
  const sunSignInfo = ZODIAC_SIGNS[sunSign]
  const moonSignInfo = ZODIAC_SIGNS[moonSign]
  const risingSignInfo = ZODIAC_SIGNS[risingSign]
  
  // 获取今日运势
  const dailyReading = DAILY_READINGS.signReadings[sunSign]
  
  // 根据日期选择今日相位
  const date = new Date(today)
  const aspectIndex = date.getDate() % DAILY_READINGS.aspects.length
  const todayAspect = DAILY_READINGS.aspects[aspectIndex]
  
  // 生成综合解读
  const overview = generateAstroOverview(sunSignInfo, moonSignInfo, todayAspect, dailyReading)
  
  // 计算运势等级
  const level = getAstrologyLevel(todayAspect, sunSign)
  
  return {
    sunSign: {
      key: sunSign,
      ...sunSignInfo
    },
    moonSign: {
      key: moonSign,
      ...moonSignInfo
    },
    risingSign: {
      key: risingSign,
      ...risingSignInfo
    },
    todayAspect,
    dailyReading,
    overview,
    level
  }
}

/**
 * 生成占星综合解读
 */
function generateAstroOverview(sunSign, moonSign, aspect, dailyReading) {
  let overview = `您的太阳星座是${sunSign.name}${sunSign.symbol}，`
  overview += `这赋予您${sunSign.traits}的特质。`
  overview += `月亮落在${moonSign.name}${moonSign.symbol}，影响您的情感表达方式。`
  overview += `今日天象呈现${aspect.name}，${aspect.effect}。`
  overview += dailyReading.overview
  
  return overview
}

/**
 * 计算运势等级
 */
function getAstrologyLevel(aspect, sunSign) {
  if (aspect.type === 'positive') {
    // 火象和风象星座在正面相位时运势更好
    const fireAndAir = ['aries', 'leo', 'sagittarius', 'gemini', 'libra', 'aquarius']
    return fireAndAir.includes(sunSign) ? '星象大吉' : '星象吉利'
  } else if (aspect.type === 'challenging') {
    return '星象平稳'
  } else {
    return '星象中和'
  }
}

/**
 * 获取星座兼容性
 */
export function getCompatibility(sign1, sign2) {
  const compatibility = {
    'fire-fire': '高度兼容，热情相撞',
    'fire-earth': '需要磨合，互相学习',
    'fire-air': '理想搭配，互相激发',
    'fire-water': '挑战组合，情感深刻',
    'earth-earth': '稳定组合，步调一致',
    'earth-air': '互补组合，理性务实',
    'earth-water': '和谐组合，滋养成长',
    'air-air': '智力碰撞，需要落地',
    'air-water': '情感丰富，需要理解',
    'water-water': '情感深刻，需要边界'
  }
  
  const element1 = ZODIAC_SIGNS[sign1].element
  const element2 = ZODIAC_SIGNS[sign2].element
  
  return compatibility[`${element1}-${element2}`] || '需要相互理解'
}
