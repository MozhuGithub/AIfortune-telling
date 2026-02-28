/**
 * 地占术（Geomancy）算命系统
 * 
 * 地占术是一种古老的占卜方法，起源于中东/北非，后传入欧洲
 * 通过在地面上随机生成点阵，形成16种不同的卦象
 * 
 * 16种地占卦象：
 * - 每个卦由4行组成，每行1或2个点
 * - 类似于易经的二进制系统
 */

// 十六地占卦象
const GEOMANTIC_FIGURES = {
  via: {
    name: '道路',
    nameEn: 'Via',
    symbol: '⦿⦿⦿⦿',
    pattern: [1, 1, 1, 1],  // 1=单点, 2=双点
    element: '水',
    planet: '月亮',
    meaning: '变化、旅程、移动',
    overview: '道路卦象征变化与移动。今日适合出行、开始新的事物，变化中蕴藏机遇。保持开放心态，顺应变化。',
    detail: '此卦主变动，今日宜动不宜静。可能有意外的行程或消息传来。事业上有新的机会出现，需要灵活应对。感情方面可能有新的发展或变化。财运有起伏，需谨慎理财。健康方面注意出行安全。',
    advice: '拥抱变化，不要固守现状。'
  },
  populus: {
    name: '人群',
    nameEn: 'Populus',
    symbol: '⦿⦿ ⦿⦿',
    pattern: [2, 2, 2, 2],
    element: '水',
    planet: '月亮',
    meaning: '聚集、大众、等待',
    overview: '人群卦象征聚集与等待。今日适合社交活动，与他人合作会有好结果。但也需注意不要随波逐流。',
    detail: '此卦主聚集，今日适合团队合作和社交活动。事业上与人合作顺利，可能获得他人的帮助。感情方面社交运势佳，单身者有望遇到心仪对象。财运平稳，合作生财。健康方面宜参加集体活动。',
    advice: '借助他人力量，但保持自我。'
  },
  concessio: {
    name: '获得',
    nameEn: 'Concessio',
    symbol: '⦿ ⦿ ⦿⦿',
    pattern: [1, 1, 2, 2],
    element: '土',
    planet: '金星',
    meaning: '收获、礼物、接受',
    overview: '获得卦象征收获与礼物。今日可能有意外之喜，或收到期待已久的消息。保持感恩之心。',
    detail: '此卦主收获，今日可能有意外之财或好消息。事业上努力得到回报，可能获得认可或奖励。感情方面甜蜜温馨，可能有惊喜。财运亨通，正财偏财皆旺。健康方面状态良好。',
    advice: '感恩接受，同时准备付出。'
  },
  littera: {
    name: '文书',
    nameEn: 'Littera',
    symbol: '⦿⦿ ⦿ ⦿',
    pattern: [2, 2, 1, 1],
    element: '土',
    planet: '木星',
    meaning: '文书、消息、学习',
    overview: '文书卦象征消息与学习。今日适合处理文书工作、学习新知识。可能有重要消息传来。',
    detail: '此卦主文书，今日适合签署合同、处理文件或学习。事业上文书工作顺利，可能有重要通知。感情方面沟通顺畅，适合表白或深入交流。财运平稳，适合处理财务文件。健康方面注意用眼卫生。',
    advice: '关注细节，把握信息。'
  },
  fortuna_major: {
    name: '大吉',
    nameEn: 'Fortuna Major',
    symbol: '⦿ ⦿⦿ ⦿',
    pattern: [1, 2, 2, 1],
    element: '火',
    planet: '太阳',
    meaning: '大吉大利、成功、荣耀',
    overview: '大吉卦是地占术中最好的卦象之一。今日诸事顺遂，贵人相助，适合开展重要事务。',
    detail: '此卦大吉，今日运势极佳。事业上贵人相助，有升职或重大突破的机会。感情方面美满幸福，适合表白或求婚。财运亨通，投资大吉。健康方面精力充沛。',
    advice: '把握机遇，大胆行动。'
  },
  fortuna_minor: {
    name: '小吉',
    nameEn: 'Fortuna Minor',
    symbol: '⦿⦿ ⦿ ⦿⦿',
    pattern: [2, 1, 1, 2],
    element: '火',
    planet: '太阳',
    meaning: '小吉、快速成功、短暂',
    overview: '小吉卦象征小的好运。今日运势不错，但好运可能来得快去得也快，需要及时把握。',
    detail: '此卦主小吉，今日有小的好运。事业上有小的突破或进展，及时把握机会。感情方面有小惊喜，适合约会。财运有小财进账，但不宜贪多。健康方面状态不错。',
    advice: '把握当下，小步快跑。'
  },
  puella: {
    name: '少女',
    nameEn: 'Puella',
    symbol: '⦿ ⦿⦿ ⦿⦿',
    pattern: [1, 2, 1, 2],
    element: '水',
    planet: '金星',
    meaning: '女性、美丽、愉悦',
    overview: '少女卦象征美好与愉悦。今日适合享受生活，追求美好事物。人际关系和谐。',
    detail: '此卦主愉悦，今日心情愉快，适合社交和娱乐。事业上与女性合作顺利，创意工作有灵感。感情方面浪漫温馨，适合约会。财运平稳，可能有小的消费。健康方面宜放松身心。',
    advice: '享受美好，保持优雅。'
  },
  puer: {
    name: '少年',
    nameEn: 'Puer',
    symbol: '⦿⦿ ⦿ ⦿',
    pattern: [2, 1, 2, 1],
    element: '火',
    planet: '火星',
    meaning: '男性、行动、激情',
    overview: '少年卦象征行动与激情。今日充满活力，适合积极行动。但需注意控制冲动。',
    detail: '此卦主行动，今日精力充沛，适合开展新项目。事业上行动力强，但需注意方法。感情方面热情洋溢，但需避免冲动。财运有起伏，需谨慎投资。健康方面精力旺盛，适合运动。',
    advice: '积极行动，三思后行。'
  },
  albus: {
    name: '白',
    nameEn: 'Albus',
    symbol: '⦿ ⦿ ⦿⦿ ⦿',
    pattern: [1, 1, 2, 1],
    element: '气',
    planet: '水星',
    meaning: '和平、智慧、清晰',
    overview: '白卦象征和平与智慧。今日思维清晰，适合学习、研究、沟通。人际关系和谐。',
    detail: '此卦主智慧，今日思维敏捷，适合学习和沟通。事业上智慧解决问题，沟通顺畅。感情方面理性平和，适合深入交流。财运平稳，适合理财规划。健康方面注意呼吸系统。',
    advice: '运用智慧，保持平和。'
  },
  rubeus: {
    name: '红',
    nameEn: 'Rubeus',
    symbol: '⦿⦿ ⦿⦿ ⦿',
    pattern: [2, 2, 1, 2],
    element: '气',
    planet: '火星',
    meaning: '激情、警告、危险',
    overview: '红卦象征激情与警告。今日需谨慎行事，避免冲动和冒险。保持冷静。',
    detail: '此卦主警告，今日需小心谨慎。事业上避免冒险决策，稳扎稳打。感情方面可能有争执，需冷静处理。财运不佳，避免大额支出。健康方面注意安全，避免受伤。',
    advice: '保持冷静，避免冲动。'
  },
  acquistio: {
    name: '增益',
    nameEn: 'Acquisitio',
    symbol: '⦿ ⦿ ⦿ ⦿⦿',
    pattern: [1, 1, 1, 2],
    element: '土',
    planet: '木星',
    meaning: '获得、增长、财富',
    overview: '增益卦象征获得与增长。今日财运亨通，适合投资和商业活动。事业有进展。',
    detail: '此卦主增益，今日财运极佳。事业上稳步增长，有升职加薪的机会。感情方面发展顺利，关系更加稳固。财运亨通，投资有利。健康方面状态良好。',
    advice: '把握机会，稳步增长。'
  },
  amissio: {
    name: '损失',
    nameEn: 'Amissio',
    symbol: '⦿⦿ ⦿⦿ ⦿⦿',
    pattern: [2, 2, 2, 1],
    element: '土',
    planet: '金星',
    meaning: '损失、减少、放弃',
    overview: '损失卦象征减少与放弃。今日可能有损失，但有时放弃也是一种获得。宜守不宜攻。',
    detail: '此卦主损失，今日需谨慎。事业上可能有挫折，需要调整策略。感情方面可能有波折，需要包容理解。财运不佳，避免投资和消费。健康方面注意休息。',
    advice: '以退为进，学会放下。'
  },
  carcer: {
    name: '牢狱',
    nameEn: 'Carcer',
    symbol: '⦿ ⦿⦿ ⦿ ⦿⦿',
    pattern: [1, 2, 1, 2],
    element: '土',
    planet: '土星',
    meaning: '限制、延迟、束缚',
    overview: '牢狱卦象征限制与延迟。今日进展可能受阻，需要耐心等待。宜守不宜动。',
    detail: '此卦主限制，今日可能感到受阻。事业上进展缓慢，需要耐心。感情方面可能有束缚感，需要沟通。财运平稳，不宜大动作。健康方面注意关节和骨骼。',
    advice: '耐心等待，积蓄力量。'
  },
  laetitia: {
    name: '喜悦',
    nameEn: 'Laetitia',
    symbol: '⦿ ⦿ ⦿ ⦿',
    pattern: [1, 1, 1, 1],
    element: '气',
    planet: '木星',
    meaning: '喜悦、欢乐、上升',
    overview: '喜悦卦象征欢乐与上升。今日心情愉悦，好事将近。适合社交和庆祝活动。',
    detail: '此卦主喜悦，今日心情愉快。事业上有好消息，可能获得认可。感情方面甜蜜幸福，适合约会庆祝。财运上升，有意外收获。健康方面精神饱满。',
    advice: '分享喜悦，保持乐观。'
  },
  tristitia: {
    name: '悲伤',
    nameEn: 'Tristitia',
    symbol: '⦿⦿ ⦿⦿ ⦿⦿ ⦿⦿',
    pattern: [2, 2, 2, 2],
    element: '土',
    planet: '土星',
    meaning: '悲伤、下降、困难',
    overview: '悲伤卦象征困难与低谷。今日可能情绪低落，但这是暂时的。保持希望。',
    detail: '此卦主困难，今日可能感到压抑。事业上可能遇到阻碍，需要坚持。感情方面可能有误解，需要耐心沟通。财运不佳，需节省开支。健康方面注意情绪管理。',
    advice: '坚持信念，等待转机。'
  },
  caput_draconis: {
    name: '龙头',
    nameEn: 'Caput Draconis',
    symbol: '⦿ ⦿ ⦿⦿ ⦿⦿',
    pattern: [1, 1, 2, 2],
    element: '气',
    planet: '北交点',
    meaning: '上升、机遇、入口',
    overview: '龙头卦象征上升与机遇。今日好运临门，新的机遇出现。适合开始新事物。',
    detail: '此卦主机遇，今日好运连连。事业上有新的机会，大胆把握。感情方面有新的开始，单身者有望遇到良缘。财运上升，投资有利。健康方面精力充沛。',
    advice: '把握机遇，勇敢前行。'
  },
  cauda_draconis: {
    name: '龙尾',
    nameEn: 'Cauda Draconis',
    symbol: '⦿⦿ ⦿⦿ ⦿ ⦿',
    pattern: [2, 2, 1, 1],
    element: '土',
    planet: '南交点',
    meaning: '下降、结束、出口',
    overview: '龙尾卦象征结束与释放。今日适合结束旧的事物，为新的开始腾出空间。',
    detail: '此卦主结束，今日适合收尾和总结。事业上适合完成项目，为下一步做准备。感情方面可能需要放下过去，重新开始。财运平稳，清理债务。健康方面宜排毒养生。',
    advice: '放下过去，迎接新生。'
  }
}

/**
 * 生成地占卦象
 * 根据出生日期、时辰和今日日期计算
 */
function generateGeomanticFigure(birthDate, shiChenKey, today) {
  const birth = new Date(birthDate)
  const todayDate = new Date(today)
  
  // 使用出生日期和今日日期生成种子
  const seed = birth.getFullYear() * 10000 + (birth.getMonth() + 1) * 100 + birth.getDate() +
               todayDate.getFullYear() * 10000 + (todayDate.getMonth() + 1) * 100 + todayDate.getDate()
  
  // 时辰映射
  const shiChenMap = {
    zi: 1, chou: 2, yin: 3, mao: 4, chen: 5, si: 6,
    wu: 7, wei: 8, shen: 9, you: 10, xu: 11, hai: 12
  }
  const shiChenValue = shiChenMap[shiChenKey] || 1
  
  // 生成4行点数
  const pattern = []
  let tempSeed = seed + shiChenValue
  
  for (let i = 0; i < 4; i++) {
    // 伪随机生成1或2
    tempSeed = (tempSeed * 9301 + 49297) % 233280
    const value = (tempSeed / 233280) > 0.5 ? 2 : 1
    pattern.push(value)
  }
  
  // 匹配卦象
  const figureKey = matchPattern(pattern)
  return figureKey
}

/**
 * 匹配卦象模式
 */
function matchPattern(pattern) {
  for (const [key, figure] of Object.entries(GEOMANTIC_FIGURES)) {
    if (JSON.stringify(figure.pattern) === JSON.stringify(pattern)) {
      return key
    }
  }
  // 默认返回道路
  return 'via'
}

/**
 * 获取地占术解读
 */
export function getGeomancyReading(birthDate, shiChenKey, gender) {
  const today = new Date().toISOString().split('T')[0]
  
  // 生成主卦
  const mainFigureKey = generateGeomanticFigure(birthDate, shiChenKey, today)
  const mainFigure = GEOMANTIC_FIGURES[mainFigureKey]
  
  // 生成辅助卦（左卦和右卦）
  const leftFigureKey = generateGeomanticFigure(birthDate, shiChenKey, today + 'left')
  const rightFigureKey = generateGeomanticFigure(birthDate, shiChenKey, today + 'right')
  
  const leftFigure = GEOMANTIC_FIGURES[leftFigureKey]
  const rightFigure = GEOMANTIC_FIGURES[rightFigureKey]
  
  // 计算运势等级
  const level = getGeomancyLevel(mainFigureKey)
  
  // 生成综合解读
  const overview = generateGeomancyOverview(mainFigure, leftFigure, rightFigure)
  
  return {
    mainFigure: {
      key: mainFigureKey,
      ...mainFigure
    },
    leftFigure: {
      key: leftFigureKey,
      ...leftFigure
    },
    rightFigure: {
      key: rightFigureKey,
      ...rightFigure
    },
    overview,
    level
  }
}

/**
 * 生成地占综合解读
 */
function generateGeomancyOverview(main, left, right) {
  let overview = `今日地占主卦为「${main.name}」（${main.nameEn}），`
  overview += `${main.overview} `
  overview += `左卦「${left.name}」提示${left.advice} `
  overview += `右卦「${right.name}」象征${left.meaning}。`
  overview += main.detail
  
  return overview
}

/**
 * 计算运势等级
 */
function getGeomancyLevel(figureKey) {
  // 吉卦
  const luckyFigures = ['fortuna_major', 'fortuna_minor', 'acquistio', 'laetitia', 'caput_draconis', 'concessio']
  // 凶卦
  const unluckyFigures = ['amissio', 'tristitia', 'rubeus', 'cauda_draconis']
  
  if (luckyFigures.includes(figureKey)) {
    return '地象大吉'
  } else if (unluckyFigures.includes(figureKey)) {
    return '地象平稳'
  } else {
    return '地象中和'
  }
}

/**
 * 获取卦象的详细建议
 */
export function getGeomancyAdvice(figureKey) {
  const figure = GEOMANTIC_FIGURES[figureKey]
  if (!figure) return null
  
  return {
    name: figure.name,
    advice: figure.advice,
    element: figure.element,
    planet: figure.planet
  }
}
