/**
 * 塔罗牌算命系统
 * 
 * 使用韦特塔罗牌 78张
 * - 大阿尔卡纳 22张（愚者到世界）
 * - 小阿尔卡纳 56张（权杖、圣杯、宝剑、金币各14张）
 * 
 * 根据出生日期和今日日期抽取3张牌：
 * - 过去牌：影响当前状况的过去因素
 * - 现在牌：当前状况
 * - 未来牌：未来发展趋势
 */

// 大阿尔卡纳（22张）
const MAJOR_ARCANA = {
  0: { name: '愚者', nameEn: 'The Fool', symbol: '🃏', keywords: '新开始、冒险、天真、自由', meaning: '愚者代表新的开始和无限可能。此时是踏上新旅程的最佳时机，保持开放的心态，勇敢地迈出第一步。不要被过去的经验束缚，以纯真的心去探索未知。', reversed: '鲁莽、冲动、缺乏计划、不切实际' },
  1: { name: '魔术师', nameEn: 'The Magician', symbol: '🎭', keywords: '创造、意志力、技能、自信', meaning: '魔术师象征着创造力和行动力。你拥有实现目标所需的一切资源，现在是展现才能、付诸行动的时候。相信自己的能力，专注于目标。', reversed: '欺骗、操控、缺乏方向、才能被浪费' },
  2: { name: '女祭司', nameEn: 'The High Priestess', symbol: '🌙', keywords: '直觉、神秘、潜意识、智慧', meaning: '女祭司代表内在的智慧和直觉。此刻需要倾听内心的声音，答案就在你的潜意识中。保持安静，让直觉引导你。', reversed: '忽视直觉、表面化、秘密被揭露、内心不安' },
  3: { name: '女皇', nameEn: 'The Empress', symbol: '👑', keywords: '丰饶、母性、创造、自然', meaning: '女皇象征着丰饶和创造。这是孕育新事物、享受生活美好的时期。关注家庭、健康和创造力，让生活充满爱与滋养。', reversed: '依赖、过度保护、创造力受阻、情感空虚' },
  4: { name: '皇帝', nameEn: 'The Emperor', symbol: '🏰', keywords: '权威、结构、控制、父亲', meaning: '皇帝代表权威和秩序。此刻需要展现领导力，建立稳固的基础。保持理性，制定计划，有条不紊地推进目标。', reversed: '专制、僵化、控制欲过强、缺乏纪律' },
  5: { name: '教皇', nameEn: 'The Hierophant', symbol: '⛪', keywords: '传统、信仰、教导、仪式', meaning: '教皇象征着传统和精神指引。遵循既定的规则和传统可能带来帮助，寻求导师的指导，或学习古老的智慧。', reversed: '叛逆、打破常规、个人信念、反传统' },
  6: { name: '恋人', nameEn: 'The Lovers', symbol: '💕', keywords: '爱情、选择、和谐、价值观', meaning: '恋人牌代表爱情和重要的选择。在感情方面，可能面临重要的决定或关系的发展。在事业上，需要做出符合价值观的选择。', reversed: '不和谐、失衡、错误选择、价值观冲突' },
  7: { name: '战车', nameEn: 'The Chariot', symbol: '⚔️', keywords: '意志力、胜利、决心、控制', meaning: '战车象征着通过意志力取得胜利。保持专注和决心，克服障碍，向目标前进。控制好自己的情绪和欲望，胜利就在前方。', reversed: '失控、侵略性、缺乏方向、受挫' },
  8: { name: '力量', nameEn: 'Strength', symbol: '🦁', keywords: '勇气、耐心、内在力量、慈悲', meaning: '力量牌代表内在的勇气和耐心。以柔克刚，用爱和耐心面对挑战。相信自己有足够的力量克服一切困难。', reversed: '自我怀疑、软弱、缺乏自信、滥用力量' },
  9: { name: '隐士', nameEn: 'The Hermit', symbol: '🏔️', keywords: '内省、独处、指引、智慧', meaning: '隐士象征着内省和寻求真理。此刻适合独处和反思，向内寻找答案。可能需要一位智者的指引，或成为他人的导师。', reversed: '孤立、逃避、拒绝帮助、过于封闭' },
  10: { name: '命运之轮', nameEn: 'Wheel of Fortune', symbol: '🎡', keywords: '命运、转变、机遇、周期', meaning: '命运之轮代表命运的转折。变化正在发生，这是宇宙的安排。接受变化，抓住机遇，命运正在向你微笑。', reversed: '厄运、抗拒变化、失控、周期低谷' },
  11: { name: '正义', nameEn: 'Justice', symbol: '⚖️', keywords: '公正、真相、因果、平衡', meaning: '正义牌象征着公正和真相。做出公正的决定，承担自己行为的后果。真相终将大白，保持诚实和正直。', reversed: '不公正、逃避责任、偏见、法律问题' },
  12: { name: '倒吊人', nameEn: 'The Hanged Man', symbol: '🙃', keywords: '牺牲、等待、新视角、放手', meaning: '倒吊人代表暂时的停滞和等待。有时候，放下执念、换个角度看问题，答案自然会浮现。耐心等待，牺牲会带来更大的收获。', reversed: '拖延、无谓牺牲、僵局、抗拒改变' },
  13: { name: '死神', nameEn: 'Death', symbol: '💀', keywords: '结束、转变、重生、放下', meaning: '死神牌象征着结束和新生。旧的事物必须结束，才能为新的开始腾出空间。不要害怕变化，接受转变，迎接新的篇章。', reversed: '抗拒改变、停滞不前、恐惧、无法放手' },
  14: { name: '节制', nameEn: 'Temperance', symbol: '🏺', keywords: '平衡、调和、耐心、适度', meaning: '节制牌代表平衡和调和。寻找中庸之道，保持身心的和谐。耐心地融合不同的元素，创造完美的一致。', reversed: '失衡、过度、缺乏耐心、冲突' },
  15: { name: '恶魔', nameEn: 'The Devil', symbol: '😈', keywords: '束缚、欲望、物质、诱惑', meaning: '恶魔牌象征着被束缚和诱惑。认清是什么在束缚你——可能是物质欲望、不健康的关系或负面习惯。意识到这些枷锁，你就有能力挣脱。', reversed: '解脱、打破束缚、面对阴影、恢复自由' },
  16: { name: '塔', nameEn: 'The Tower', symbol: '🗼', keywords: '剧变、崩溃、觉醒、解放', meaning: '塔牌代表突如其来的变化。旧的结构正在崩塌，这是必要的破坏。虽然过程可能痛苦，但这是为了建立更稳固的基础。', reversed: '逃避灾难、恐惧改变、延迟崩溃、内在转变' },
  17: { name: '星星', nameEn: 'The Star', symbol: '⭐', keywords: '希望、灵感、平静、治愈', meaning: '星星牌象征着希望和治愈。黑暗过后，星光指引方向。保持信心，相信美好的事情正在发生。灵感会降临，身心正在恢复。', reversed: '失去希望、悲观、与精神脱节、缺乏信心' },
  18: { name: '月亮', nameEn: 'The Moon', symbol: '🌙', keywords: '幻觉、恐惧、潜意识、迷惑', meaning: '月亮牌代表不确定和幻觉。事物并非表面看起来那样，需要小心陷阱和欺骗。倾听潜意识的信息，但不要被恐惧支配。', reversed: '释放恐惧、真相大白、克服焦虑、直觉增强' },
  19: { name: '太阳', nameEn: 'The Sun', symbol: '☀️', keywords: '成功、喜悦、活力、积极', meaning: '太阳牌是最积极的牌之一，象征着成功和喜悦。一切都在向好的方向发展，充满活力和正能量。享受生活的美好，光明就在前方。', reversed: '暂时的挫折、过度乐观、延迟的成功、内在小孩' },
  20: { name: '审判', nameEn: 'Judgement', symbol: '📯', keywords: '觉醒、重生、召唤、反省', meaning: '审判牌象征着觉醒和重生。听到内心的召唤，是时候审视过去，做出改变。接受自己的全部，包括过去的错误，迎接新的开始。', reversed: '自我怀疑、拒绝召唤、无法原谅、恐惧审判' },
  21: { name: '世界', nameEn: 'The World', symbol: '🌍', keywords: '完成、圆满、成就、整合', meaning: '世界牌代表圆满和完成。一个重要的周期即将结束，你已经达成了目标。庆祝成就，准备迎接新的旅程。', reversed: '未完成、缺乏结束、延迟成功、寻求结束' }
}

// 小阿尔卡纳 - 权杖（火元素，代表行动和热情）
const WANDS = {
  'wand-ace': { name: '权杖一', symbol: '🔥', keywords: '新开始、灵感、潜力', meaning: '权杖一代表新的机遇和灵感迸发。热情正在点燃，新的项目或冒险即将开始。抓住这个充满潜力的时刻。' },
  'wand-2': { name: '权杖二', symbol: '🔮', keywords: '计划、决定、愿景', meaning: '权杖二象征着计划和决策。你正在考虑下一步的方向，有多个选择摆在面前。需要做出决定，勇敢地迈出步伐。' },
  'wand-3': { name: '权杖三', symbol: '🚢', keywords: '扩展、远见、合作', meaning: '权杖三代表视野的开阔和扩展。机会正在向你走来，可能涉及远行或跨国合作。保持开放的心态，迎接更大的舞台。' },
  'wand-4': { name: '权杖四', symbol: '🎊', keywords: '庆祝、和谐、回家', meaning: '权杖四象征着庆祝和稳定。这是享受成果、与亲朋好友欢聚的时刻。家庭和社区的联系带来温暖和支持。' },
  'wand-5': { name: '权杖五', symbol: '⚔️', keywords: '冲突、竞争、挑战', meaning: '权杖五代表冲突和竞争。可能面临意见分歧或需要竞争的局面。保持冷静，用健康的方式处理冲突。' },
  'wand-6': { name: '权杖六', symbol: '🏆', keywords: '胜利、荣耀、认可', meaning: '权杖六象征着胜利和公众认可。你的努力得到了回报，正处于高光时刻。享受成功，接受他人的赞美。' },
  'wand-7': { name: '权杖七', symbol: '🛡️', keywords: '防御、坚持、立场', meaning: '权杖七代表需要坚持立场。可能面临挑战或竞争，但你有能力捍卫自己的位置。保持自信，不要轻易放弃。' },
  'wand-8': { name: '权杖八', symbol: '⚡', keywords: '速度、行动、移动', meaning: '权杖八象征着快速的发展和行动。事情正在加速进行，好消息即将到来。保持灵活，随时准备行动。' },
  'wand-9': { name: '权杖九', symbol: '🧱', keywords: '坚韧、经验、警惕', meaning: '权杖九代表坚韧不拔的精神。虽然经历了许多挑战，但你依然站立。运用过去的经验，保护好自己。' },
  'wand-10': { name: '权杖十', symbol: '📦', keywords: '负担、责任、压力', meaning: '权杖十象征着沉重的负担。承担了太多责任，需要学会 delegating 或放下一些。不要让压力压垮自己。' },
  'wand-page': { name: '权杖侍从', symbol: '💌', keywords: '探索、热情、消息', meaning: '权杖侍从代表热情的探索者。有新的消息或机会到来，保持好奇心和学习的态度。' },
  'wand-knight': { name: '权杖骑士', symbol: '🏇', keywords: '行动、冒险、冲动', meaning: '权杖骑士象征着行动和冒险精神。充满激情地追求目标，但要注意不要过于冲动。' },
  'wand-queen': { name: '权杖王后', symbol: '👸', keywords: '自信、热情、决心', meaning: '权杖王后代表自信和热情的女性能量。坚定地追求目标，同时保持温暖和包容。' },
  'wand-king': { name: '权杖国王', symbol: '🤴', keywords: '领导、远见、企业家', meaning: '权杖国王象征着充满魅力的领导者。有远见和魄力，能够激励他人，实现宏伟目标。' }
}

// 小阿尔卡纳 - 圣杯（水元素，代表情感和关系）
const CUPS = {
  'cup-ace': { name: '圣杯一', symbol: '💝', keywords: '新感情、直觉、灵感', meaning: '圣杯一代表新的情感开始。爱情或友情方面可能有新的发展，心灵充满喜悦和感激。' },
  'cup-2': { name: '圣杯二', symbol: '💑', keywords: '合作、连接、吸引', meaning: '圣杯二象征着和谐的伙伴关系。无论是爱情还是事业，都预示着美好的合作和相互吸引。' },
  'cup-3': { name: '圣杯三', symbol: '🎉', keywords: '友谊、庆祝、社交', meaning: '圣杯三代表友谊和社交的喜悦。与朋友欢聚，庆祝成功，享受人际关系带来的快乐。' },
  'cup-4': { name: '圣杯四', symbol: '😐', keywords: '冷漠、不满、反思', meaning: '圣杯四象征着情感上的冷淡或不满。可能对现状感到厌倦，忽略了身边的机会。需要调整心态。' },
  'cup-5': { name: '圣杯五', symbol: '😢', keywords: '失落、悲伤、遗憾', meaning: '圣杯五代表情感上的失落和悲伤。关注失去的东西而忽略了还拥有的。允许自己悲伤，但不要沉溺其中。' },
  'cup-6': { name: '圣杯六', symbol: '🏠', keywords: '怀旧、童年、回忆', meaning: '圣杯六象征着对过去的怀念。可能与过去的人或事重新联系，或需要回顾童年的经历来治愈。' },
  'cup-7': { name: '圣杯七', symbol: '🌈', keywords: '幻想、选择、迷惑', meaning: '圣杯七代表面临众多选择和幻想。看似很多机会，但需要分辨哪些是真实的，哪些只是幻象。' },
  'cup-8': { name: '圣杯八', symbol: '🚶', keywords: '离开、放弃、寻找', meaning: '圣杯八象征着离开不再适合自己的环境。虽然痛苦，但为了更高的追求，需要放下现有的。' },
  'cup-9': { name: '圣杯九', symbol: '😊', keywords: '满足、愿望实现、感恩', meaning: '圣杯九代表愿望的实现和内心的满足。所期望的正在成真，享受这份喜悦和满足感。' },
  'cup-10': { name: '圣杯十', symbol: '👨‍👩‍👧‍👦', keywords: '家庭、幸福、和谐', meaning: '圣杯十象征着家庭的幸福和情感的圆满。与家人朋友共享美好时光，生活充满爱与和谐。' },
  'cup-page': { name: '圣杯侍从', symbol: '💌', keywords: '消息、创意、直觉', meaning: '圣杯侍从代表情感方面的新消息。可能有浪漫的邀约或创意的灵感涌现。' },
  'cup-knight': { name: '圣杯骑士', symbol: '🤴', keywords: '浪漫、追求、魅力', meaning: '圣杯骑士象征着浪漫的追求者。在感情方面带来美好的发展，充满诗意和浪漫。' },
  'cup-queen': { name: '圣杯王后', symbol: '👸', keywords: '同理心、直觉、关怀', meaning: '圣杯王后代表情感成熟和直觉敏锐的女性能量。善于理解他人的感受，给予温暖的支持。' },
  'cup-king': { name: '圣杯国王', symbol: '🤴', keywords: '情感平衡、外交、智慧', meaning: '圣杯国王象征着情感智慧和控制力。在处理情感问题上游刃有余，善于调解和沟通。' }
}

// 小阿尔卡纳 - 宝剑（风元素，代表思想和冲突）
const SWORDS = {
  'sword-ace': { name: '宝剑一', symbol: '🗡️', keywords: '清晰、突破、真相', meaning: '宝剑一代表思想的清晰和突破。真相即将揭晓，用理性的思维做出决定。' },
  'sword-2': { name: '宝剑二', symbol: '⚖️', keywords: '僵局、选择、回避', meaning: '宝剑二象征着难以做出的选择。处于僵局中，需要放下防御，勇敢面对现实。' },
  'sword-3': { name: '宝剑三', symbol: '💔', keywords: '心碎、悲伤、痛苦', meaning: '宝剑三代表情感上的痛苦和心碎。经历失落和悲伤，但这是治愈的必要过程。' },
  'sword-4': { name: '宝剑四', symbol: '🛏️', keywords: '休息、恢复、冥想', meaning: '宝剑四象征着需要休息和恢复。暂时放下争斗，给自己时间疗愈和充电。' },
  'sword-5': { name: '宝剑五', symbol: '😤', keywords: '冲突、失败、空虚', meaning: '宝剑五代表冲突和空洞的胜利。赢得争执但失去更多，需要反思真正的胜利是什么。' },
  'sword-6': { name: '宝剑六', symbol: '⛵', keywords: '过渡、离开、平静', meaning: '宝剑六象征着从困难中过渡。正在离开 turbulent 的水域，驶向更平静的地方。' },
  'sword-7': { name: '宝剑七', symbol: '🎭', keywords: '欺骗、策略、逃避', meaning: '宝剑七代表需要策略或可能面临欺骗。小心他人的不诚实，或需要用智谋达成目标。' },
  'sword-8': { name: '宝剑八', symbol: '🔗', keywords: '束缚、无力、自我限制', meaning: '宝剑八象征着被困境困住的感觉。但很多限制是自我设限，改变思维就能获得自由。' },
  'sword-9': { name: '宝剑九', symbol: '😰', keywords: '焦虑、噩梦、担忧', meaning: '宝剑九代表深层的焦虑和担忧。夜晚的恐惧反映了内心的不安，需要面对并处理这些情绪。' },
  'sword-10': { name: '宝剑十', symbol: '💀', keywords: '结束、背叛、重生', meaning: '宝剑十象征着痛苦的结束。虽然过程艰难，但这意味着最坏的已经过去，新的开始即将到来。' },
  'sword-page': { name: '宝剑侍从', symbol: '📋', keywords: '好奇、观察、消息', meaning: '宝剑侍从代表新的思想和消息。保持警惕和好奇心，收集信息以做出明智的决定。' },
  'sword-knight': { name: '宝剑骑士', symbol: '🏇', keywords: '冲动、行动、直接', meaning: '宝剑骑士象征着快速的思考和行动。勇敢但可能过于冲动，需要平衡速度与谨慎。' },
  'sword-queen': { name: '宝剑王后', symbol: '👸', keywords: '独立、清晰、直接', meaning: '宝剑王后代表理性和独立的女性能量。善于分析，直言不讳，用智慧解决问题。' },
  'sword-king': { name: '宝剑国王', symbol: '🤴', keywords: '权威、理性、判断', meaning: '宝剑国王象征着理性和权威。用清晰的思维和公正的判断领导他人，做出明智的决定。' }
}

// 小阿尔卡纳 - 金币（土元素，代表物质和财富）
const PENTACLES = {
  'pentacle-ace': { name: '金币一', symbol: '💰', keywords: '新机会、财富、繁荣', meaning: '金币一代表新的财务机会。金钱或物质方面的好运即将到来，抓住这个机会。' },
  'pentacle-2': { name: '金币二', symbol: '🔄', keywords: '平衡、灵活、适应', meaning: '金币二象征着需要平衡和灵活处理财务或工作。在多个事务之间保持灵活性。' },
  'pentacle-3': { name: '金币三', symbol: '👷', keywords: '合作、技能、学习', meaning: '金币三代表团队合作和技能提升。与他人合作能够创造更好的成果，也是学习的好时机。' },
  'pentacle-4': { name: '金币四', symbol: '🔒', keywords: '保守、控制、安全', meaning: '金币四象征着对财务的保守态度。可能过于吝啬或害怕失去，需要找到安全与慷慨的平衡。' },
  'pentacle-5': { name: '金币五', symbol: '❄️', keywords: '困难、贫穷、孤立', meaning: '金币五代表物质上的困难时期。可能面临财务压力或感到孤立无援，但帮助就在身边。' },
  'pentacle-6': { name: '金币六', symbol: '🤝', keywords: '慷慨、分享、公平', meaning: '金币六象征着给予和接受的平衡。无论是接受帮助还是帮助他人，都保持感恩和慷慨的心态。' },
  'pentacle-7': { name: '金币七', symbol: '🌱', keywords: '耐心、投资、反思', meaning: '金币七代表需要耐心等待回报。努力正在积累，但需要时间才能看到成果。' },
  'pentacle-8': { name: '金币八', symbol: '🔨', keywords: '勤奋、技能、专注', meaning: '金币八象征着勤奋工作和技能精进。专注于提升自己，努力会有回报。' },
  'pentacle-9': { name: '金币九', symbol: '🍇', keywords: '富足、独立、享受', meaning: '金币九代表物质上的富足和独立享受。辛勤工作的成果正在显现，享受生活的美好。' },
  'pentacle-10': { name: '金币十', symbol: '🏘️', keywords: '财富、传承、家庭', meaning: '金币十象征着长久的财富和家庭繁荣。物质基础稳固，可以享受家族的幸福和传承。' },
  'pentacle-page': { name: '金币侍从', symbol: '🌱', keywords: '机会、学习、目标', meaning: '金币侍从代表新的财务机会或学习计划。有目标和热情去追求物质上的成功。' },
  'pentacle-knight': { name: '金币骑士', symbol: '🏇', keywords: '勤奋、可靠、稳定', meaning: '金币骑士象征着稳定可靠的努力。不急不躁，稳步前进，最终达成目标。' },
  'pentacle-queen': { name: '金币王后', symbol: '👸', keywords: '富足、务实、关怀', meaning: '金币王后代表物质丰富且务实关怀的女性能量。善于理财，也能照顾好自己和他人。' },
  'pentacle-king': { name: '金币国王', symbol: '🤴', keywords: '财富、成功、企业家', meaning: '金币国王象征着财务上的成功和领导力。在商业和财务方面有卓越的能力和成就。' }
}

// 合并所有牌
const ALL_CARDS = { ...MAJOR_ARCANA }
Object.keys(WANDS).forEach(key => ALL_CARDS[key] = { ...WANDS[key], suit: 'wands' })
Object.keys(CUPS).forEach(key => ALL_CARDS[key] = { ...CUPS[key], suit: 'cups' })
Object.keys(SWORDS).forEach(key => ALL_CARDS[key] = { ...SWORDS[key], suit: 'swords' })
Object.keys(PENTACLES).forEach(key => ALL_CARDS[key] = { ...PENTACLES[key], suit: 'pentacles' })

/**
 * 根据日期和用户信息抽取塔罗牌
 * 使用三张牌阵：过去、现在、未来
 */
export function getTarotReading(birthDate, shiChenKey, gender) {
  const today = new Date()
  const birth = new Date(birthDate)
  
  // 使用出生日期和今日日期生成种子
  const seed = birth.getFullYear() + birth.getMonth() + birth.getDate() + 
               today.getFullYear() + today.getMonth() + today.getDate()
  
  // 伪随机数生成器（确定性）
  const seededRandom = (offset) => {
    const x = Math.sin(seed + offset) * 10000
    return x - Math.floor(x)
  }
  
  // 获取所有牌的key
  const cardKeys = Object.keys(ALL_CARDS)
  
  // 抽取三张牌
  const cardIndices = [
    Math.floor(seededRandom(1) * cardKeys.length),
    Math.floor(seededRandom(2) * cardKeys.length),
    Math.floor(seededRandom(3) * cardKeys.length)
  ]
  
  const cards = cardIndices.map((idx, i) => {
    const card = ALL_CARDS[cardKeys[idx]]
    // 判断是否逆位（约30%概率）
    const isReversed = seededRandom(10 + i) < 0.3
    return {
      ...card,
      key: cardKeys[idx],
      position: i === 0 ? '过去' : i === 1 ? '现在' : '未来',
      isReversed
    }
  })
  
  // 生成综合解读
  const overview = generateOverview(cards)
  
  return {
    cards,
    overview,
    level: getFortuneLevel(cards)
  }
}

/**
 * 根据三张牌生成综合运势等级
 */
function getFortuneLevel(cards) {
  // 计算积极牌的数量
  let positiveCount = 0
  const positiveCards = ['愚者', '魔术师', '女皇', '皇帝', '恋人', '战车', '力量', 
                         '命运之轮', '星星', '太阳', '世界', '权杖一', '权杖六', 
                         '圣杯一', '圣杯九', '圣杯十', '金币一', '金币九', '金币十']
  
  cards.forEach(card => {
    if (!card.isReversed && positiveCards.includes(card.name)) {
      positiveCount++
    } else if (card.isReversed && !positiveCards.includes(card.name)) {
      positiveCount++
    }
  })
  
  if (positiveCount >= 3) return '大吉大利'
  if (positiveCount >= 2) return '吉星高照'
  if (positiveCount >= 1) return '平稳顺利'
  return '韬光养晦'
}

/**
 * 生成综合解读
 */
function generateOverview(cards) {
  const [past, present, future] = cards
  
  let overview = `塔罗牌显示：`
  overview += `过去受到「${past.name}${past.isReversed ? '（逆位）' : ''}」的影响，${past.meaning}`
  overview += `当前状况对应「${present.name}${present.isReversed ? '（逆位）' : ''}」，${present.meaning}`
  overview += `未来趋势指向「${future.name}${future.isReversed ? '（逆位）' : ''}」，${future.meaning}`
  
  return overview
}

/**
 * 获取单张牌的详细解读
 */
export function getCardDetail(cardKey, isReversed = false) {
  const card = ALL_CARDS[cardKey]
  if (!card) return null
  
  return {
    ...card,
    isReversed,
    fullMeaning: isReversed ? card.reversed : card.meaning
  }
}
