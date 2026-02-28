import { useState, useEffect } from 'react'
import { getTodayFortune } from './lib/liuyao'
import { getTarotReading } from './lib/tarot'
import { getAstrologyReading } from './lib/astrology'
import { getGeomancyReading } from './lib/geomancy'

// 命理详情页组件
function FortuneDetail({ fortuneResult, setCurrentPage }) {
  if (!fortuneResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-gray-400">
        <p>您还没有抽签，请先返回首页进行抽签</p>
        <button 
          onClick={() => setCurrentPage('home')}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg hover:shadow-[0_0_20px_rgba(196,76,255,0.4)] transition-all"
        >
          去抽签
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center min-h-[80vh] px-4 py-8 pb-16 relative scanline">
      <h2 className="text-4xl font-bold mb-8 gradient-text-neon">
        命理详解
      </h2>

      <div className="w-full max-w-2xl space-y-6">
        {/* 1. 周易六爻 */}
        <div className="bg-gradient-to-br from-[#1a1a2e]/90 to-[#0a0a0f]/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-purple-500/20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
          
          <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
            <span>☯️</span> 周易六爻
            <span className="text-sm font-normal text-gray-500 ml-2">{fortuneResult.title}</span>
          </h3>
          
          <p className="text-gray-300/80 leading-relaxed mb-4">{fortuneResult.overview}</p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-[#0a0a0f]/50 rounded-lg border border-purple-500/10">
              <h4 className="text-purple-400/80 text-xs mb-1">💼 事业</h4>
              <p className="text-gray-300/70 text-sm">{fortuneResult.details.career}</p>
            </div>
            <div className="p-3 bg-[#0a0a0f]/50 rounded-lg border border-pink-500/10">
              <h4 className="text-pink-400/80 text-xs mb-1">💕 感情</h4>
              <p className="text-gray-300/70 text-sm">{fortuneResult.details.love}</p>
            </div>
            <div className="p-3 bg-[#0a0a0f]/50 rounded-lg border border-yellow-500/10">
              <h4 className="text-yellow-400/80 text-xs mb-1">💰 财运</h4>
              <p className="text-gray-300/70 text-sm">{fortuneResult.details.wealth}</p>
            </div>
            <div className="p-3 bg-[#0a0a0f]/50 rounded-lg border border-cyan-500/10">
              <h4 className="text-cyan-400/80 text-xs mb-1">🏥 健康</h4>
              <p className="text-gray-300/70 text-sm">{fortuneResult.details.health}</p>
            </div>
          </div>
        </div>

        {/* 2. 塔罗牌 */}
        <div className="bg-gradient-to-br from-[#1a1a2e]/90 to-[#0a0a0f]/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-pink-500/20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
          
          <h3 className="text-xl font-bold text-pink-400 mb-4 flex items-center gap-2">
            <span>🔮</span> 塔罗牌
            {fortuneResult.tarot && (
              <span className="text-sm font-normal text-gray-500 ml-2">{fortuneResult.tarot.level}</span>
            )}
          </h3>

          {fortuneResult.tarot ? (
            <>
              {/* 三张牌 */}
              <div className="flex justify-center gap-6 mb-4">
                {fortuneResult.tarot.cards.map((card, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-4xl mb-1 ${card.isReversed ? 'rotate-180' : ''}`}>
                      {card.symbol}
                    </div>
                    <h4 className="text-xs font-medium text-white">
                      {card.name}
                      {card.isReversed && <span className="text-pink-400 text-[10px] ml-0.5">逆</span>}
                    </h4>
                    <p className="text-[10px] text-gray-500">{card.position}</p>
                  </div>
                ))}
              </div>

              <p className="text-gray-300/80 text-sm leading-relaxed">{fortuneResult.tarot.overview}</p>
            </>
          ) : (
            <p className="text-gray-400 text-sm">请重新抽签以获取塔罗牌解读</p>
          )}
        </div>

        {/* 3. 占星术 */}
        <div className="bg-gradient-to-br from-[#1a1a2e]/90 to-[#0a0a0f]/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-blue-500/20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          
          <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
            <span>✨</span> 占星术
            {fortuneResult.astrology && (
              <span className="text-sm font-normal text-gray-500 ml-2">{fortuneResult.astrology.level}</span>
            )}
          </h3>

          {fortuneResult.astrology ? (
            <>
              {/* 星盘信息 */}
              <div className="flex justify-center gap-4 mb-4">
                <div className="text-center px-3 py-2 bg-[#0a0a0f]/50 rounded-lg">
                  <div className="text-2xl mb-1">{fortuneResult.astrology.sunSign.symbol}</div>
                  <p className="text-[10px] text-gray-400">太阳</p>
                  <p className="text-xs text-white">{fortuneResult.astrology.sunSign.name}</p>
                </div>
                <div className="text-center px-3 py-2 bg-[#0a0a0f]/50 rounded-lg">
                  <div className="text-2xl mb-1">{fortuneResult.astrology.moonSign.symbol}</div>
                  <p className="text-[10px] text-gray-400">月亮</p>
                  <p className="text-xs text-white">{fortuneResult.astrology.moonSign.name}</p>
                </div>
                <div className="text-center px-3 py-2 bg-[#0a0a0f]/50 rounded-lg">
                  <div className="text-2xl mb-1">{fortuneResult.astrology.risingSign.symbol}</div>
                  <p className="text-[10px] text-gray-400">上升</p>
                  <p className="text-xs text-white">{fortuneResult.astrology.risingSign.name}</p>
                </div>
              </div>

              {/* 今日天象 */}
              <div className="mb-3 p-3 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/20">
                <p className="text-blue-300 text-xs">
                  🌌 今日天象：{fortuneResult.astrology.todayAspect.name}
                </p>
                <p className="text-gray-400 text-xs mt-1">{fortuneResult.astrology.todayAspect.effect}</p>
              </div>

              <p className="text-gray-300/80 text-sm leading-relaxed">{fortuneResult.astrology.overview}</p>

              {/* 幸运元素 */}
              <div className="mt-3 flex gap-4 text-xs">
                <span className="text-gray-500">幸运色：{fortuneResult.astrology.dailyReading.lucky}</span>
                <span className="text-gray-500">幸运数：{fortuneResult.astrology.dailyReading.number}</span>
              </div>
            </>
          ) : (
            <p className="text-gray-400 text-sm">请重新抽签以获取占星术解读</p>
          )}
        </div>

        {/* 4. 地占术 */}
        <div className="bg-gradient-to-br from-[#1a1a2e]/90 to-[#0a0a0f]/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-green-500/20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
          
          <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
            <span>🌍</span> 地占术
            {fortuneResult.geomancy && (
              <span className="text-sm font-normal text-gray-500 ml-2">{fortuneResult.geomancy.level}</span>
            )}
          </h3>

          {fortuneResult.geomancy ? (
            <>
              {/* 三卦展示 */}
              <div className="flex justify-center gap-4 mb-4">
                <div className="text-center px-3 py-2 bg-[#0a0a0f]/50 rounded-lg">
                  <div className="text-lg mb-1 font-mono text-green-300">{fortuneResult.geomancy.leftFigure.symbol}</div>
                  <p className="text-[10px] text-gray-400">左卦</p>
                  <p className="text-xs text-white">{fortuneResult.geomancy.leftFigure.name}</p>
                </div>
                <div className="text-center px-4 py-2 bg-green-900/20 rounded-lg border border-green-500/30">
                  <div className="text-xl mb-1 font-mono text-green-300">{fortuneResult.geomancy.mainFigure.symbol}</div>
                  <p className="text-[10px] text-green-400">主卦</p>
                  <p className="text-sm text-white font-medium">{fortuneResult.geomancy.mainFigure.name}</p>
                </div>
                <div className="text-center px-3 py-2 bg-[#0a0a0f]/50 rounded-lg">
                  <div className="text-lg mb-1 font-mono text-green-300">{fortuneResult.geomancy.rightFigure.symbol}</div>
                  <p className="text-[10px] text-gray-400">右卦</p>
                  <p className="text-xs text-white">{fortuneResult.geomancy.rightFigure.name}</p>
                </div>
              </div>

              {/* 卦象信息 */}
              <div className="mb-3 flex justify-center gap-4 text-xs text-gray-500">
                <span>元素：{fortuneResult.geomancy.mainFigure.element}</span>
                <span>守护：{fortuneResult.geomancy.mainFigure.planet}</span>
              </div>

              <p className="text-gray-300/80 text-sm leading-relaxed">{fortuneResult.geomancy.overview}</p>

              {/* 建议 */}
              <div className="mt-3 p-3 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-lg border border-green-500/20">
                <p className="text-green-300 text-xs">
                  💡 {fortuneResult.geomancy.mainFigure.advice}
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-400 text-sm">请重新抽签以获取地占术解读</p>
          )}
        </div>
      </div>
    </div>
  )
}

// 生成四大占卜术综合结果
function generateCombinedOverview(result) {
  if (!result) return ''
  
  const parts = []
  
  // 六爻
  if (result.title) {
    parts.push(`六爻得${result.title}`)
  }
  
  // 塔罗
  if (result.tarot && result.tarot.cards) {
    const cardNames = result.tarot.cards.map(c => c.name).join('、')
    parts.push(`塔罗抽中${cardNames}`)
  }
  
  // 占星
  if (result.astrology) {
    parts.push(`星象${result.astrology.level}`)
  }
  
  // 地占
  if (result.geomancy) {
    parts.push(`地占${result.geomancy.mainFigure?.name || ''}卦`)
  }
  
  // 综合判断运势
  const level = result.fortuneLevel || '平稳顺利'
  
  let overview = parts.join('，') + '。'
  overview += `综合四术推演，今日运势${level}。`
  
  // 截断到100字
  if (overview.length > 100) {
    overview = overview.substring(0, 97) + '...'
  }
  
  return overview
}

// 整合四术生成穿搭建议
function generateCombinedOutfit(result) {
  if (!result) return '今日宜穿着舒适得体的服饰，保持良好心态。'
  
  const tips = []
  
  // 六爻穿搭建议（取关键信息）
  if (result.outfit) {
    // 提取颜色关键词
    const colorMatch = result.outfit.match(/(红色|蓝色|绿色|黄色|白色|黑色|金色|紫色|粉色|橙色|灰色|银色|暖色|素色|淡色|深色|亮色)/)
    if (colorMatch) {
      tips.push(colorMatch[1])
    }
  }
  
  // 占星幸运色
  if (result.astrology?.dailyReading?.lucky) {
    tips.push(result.astrology.dailyReading.lucky + '系')
  }
  
  // 地占元素
  if (result.geomancy?.mainFigure?.element) {
    const elementColors = {
      '火': '红橙暖色',
      '水': '蓝黑冷色',
      '土': '黄棕大地色',
      '气': '白灰清新色'
    }
    const elemColor = elementColors[result.geomancy.mainFigure.element]
    if (elemColor) tips.push(elemColor)
  }
  
  // 去重并生成建议
  const uniqueTips = [...new Set(tips)].slice(0, 3)
  
  if (uniqueTips.length > 0) {
    return `今日宜穿${uniqueTips.join('、')}服饰，搭配简约配饰，增强整体运势与气场。`
  }
  
  return result.outfit || '今日宜穿着舒适得体的服饰，保持自信。'
}

// 整合四术生成睡眠建议
function generateCombinedSleep(result) {
  if (!result) return '建议23点前入睡，保持规律作息。'
  
  const tips = []
  
  // 六爻睡眠建议（提取时间）
  if (result.sleep) {
    const timeMatch = result.sleep.match(/(\d{1,2}[:：]?\d{0,2}|(\d{1,2})点)/)
    if (timeMatch) {
      tips.push(timeMatch[1] + '前入睡')
    }
  }
  
  // 地占元素对应的睡眠建议
  if (result.geomancy?.mainFigure?.element) {
    const sleepByElement = {
      '火': '睡前避免剧烈运动',
      '水': '保持卧室安静',
      '土': '注意保暖',
      '气': '保持通风'
    }
    const elemTip = sleepByElement[result.geomancy.mainFigure.element]
    if (elemTip) tips.push(elemTip)
  }
  
  // 塔罗牌暗示
  if (result.tarot?.cards) {
    const hasMoonCard = result.tarot.cards.some(c => c.name.includes('月亮') || c.name.includes('隐士'))
    if (hasMoonCard) {
      tips.push('有助于好梦')
    }
  }
  
  // 去重并生成建议
  const uniqueTips = [...new Set(tips)].slice(0, 2)
  
  if (uniqueTips.length > 0) {
    return `建议${uniqueTips.join('，')}，有助于恢复精力。`
  }
  
  return result.sleep || '建议23点前入睡，保持规律作息。'
}

// 用户信息弹窗组件
function UserInfoModal({ isOpen, onClose, onSubmit, initialData }) {
  // 解析初始日期
  const parseDate = (dateStr) => {
    if (!dateStr) return { year: '', month: '', day: '' }
    const parts = dateStr.split('-')
    return {
      year: parts[0] || '',
      month: parts[1] || '',
      day: parts[2] || ''
    }
  }
  
  const initialDate = parseDate(initialData?.birthDate)
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    birthYear: initialDate.year,
    birthMonth: initialDate.month,
    birthDay: initialDate.day,
    birthHour: initialData?.birthHour || '',
    gender: initialData?.gender || ''
  })

  useEffect(() => {
    if (initialData) {
      const date = parseDate(initialData.birthDate)
      setFormData({
        name: initialData.name || '',
        birthYear: date.year,
        birthMonth: date.month,
        birthDay: date.day,
        birthHour: initialData.birthHour || '',
        gender: initialData.gender || ''
      })
    }
  }, [initialData, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    // 组装日期字符串
    const birthDate = `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`
    onSubmit({
      name: formData.name,
      birthDate,
      birthHour: formData.birthHour,
      gender: formData.gender
    })
  }

  if (!isOpen) return null

  // 生成年份选项（1950-2010）
  const years = []
  for (let y = 2010; y >= 1950; y--) {
    years.push(y)
  }
  
  // 生成月份选项
  const months = []
  for (let m = 1; m <= 12; m++) {
    months.push(m.toString().padStart(2, '0'))
  }
  
  // 生成日期选项
  const days = []
  for (let d = 1; d <= 31; d++) {
    days.push(d.toString().padStart(2, '0'))
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 w-full max-w-md shadow-2xl border border-purple-500/30">
        {/* 装饰性光芒 */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        
        <h3 className="text-xl font-bold text-center mb-6 gradient-text-neon">请填写您的基本信息</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-purple-300 mb-2 text-sm">您的姓名</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-[#0a0a0f]/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,212,255,0.3)] transition-all"
              placeholder="请输入姓名"
            />
          </div>
          <div>
            <label className="block text-purple-300 mb-2 text-sm">出生日期</label>
            <div className="grid grid-cols-3 gap-2">
              <select 
                required
                value={formData.birthYear}
                onChange={(e) => setFormData({...formData, birthYear: e.target.value})}
                className="px-3 py-3 bg-[#0a0a0f]/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-all appearance-none"
              >
                <option value="">年</option>
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <select 
                required
                value={formData.birthMonth}
                onChange={(e) => setFormData({...formData, birthMonth: e.target.value})}
                className="px-3 py-3 bg-[#0a0a0f]/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-all appearance-none"
              >
                <option value="">月</option>
                {months.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select 
                required
                value={formData.birthDay}
                onChange={(e) => setFormData({...formData, birthDay: e.target.value})}
                className="px-3 py-3 bg-[#0a0a0f]/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-all appearance-none"
              >
                <option value="">日</option>
                {days.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-purple-300 mb-2 text-sm">出生时辰</label>
            <select 
              required
              value={formData.birthHour}
              onChange={(e) => setFormData({...formData, birthHour: e.target.value})}
              className="w-full px-4 py-3 bg-[#0a0a0f]/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,212,255,0.3)] transition-all"
            >
              <option value="">请选择时辰</option>
              <option value="zi">子时 (23:00-01:00)</option>
              <option value="chou">丑时 (01:00-03:00)</option>
              <option value="yin">寅时 (03:00-05:00)</option>
              <option value="mao">卯时 (05:00-07:00)</option>
              <option value="chen">辰时 (07:00-09:00)</option>
              <option value="si">巳时 (09:00-11:00)</option>
              <option value="wu">午时 (11:00-13:00)</option>
              <option value="wei">未时 (13:00-15:00)</option>
              <option value="shen">申时 (15:00-17:00)</option>
              <option value="you">酉时 (17:00-19:00)</option>
              <option value="xu">戌时 (19:00-21:00)</option>
              <option value="hai">亥时 (21:00-23:00)</option>
            </select>
          </div>
          <div>
            <label className="block text-purple-300 mb-2 text-sm">性别</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="gender" 
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-4 h-4 accent-cyan-400"
                />
                <span className="text-gray-300 group-hover:text-cyan-400 transition-colors">男</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="gender" 
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-4 h-4 accent-cyan-400"
                />
                <span className="text-gray-300 group-hover:text-cyan-400 transition-colors">女</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-[#0a0a0f] text-gray-400 rounded-lg border border-gray-700 hover:border-gray-500 hover:text-white transition-all"
            >
              取消
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(196,76,255,0.4)] transition-all"
            >
              开始测算
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// 抽签结果总览组件
function FortuneOverview({ result, onDrawAgain }) {
  return (
    <div className="flex flex-col items-center px-4 py-8 pb-16 relative scanline">
      {/* 主签运卡片 */}
      <div className="w-full max-w-2xl relative bg-gradient-to-br from-[#1a1a2e]/90 to-[#0a0a0f]/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-purple-500/20 mb-6 mystic-border card-float">
        {/* 顶部装饰线 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        
        <h3 className="text-sm text-purple-400/60 text-center mb-4 tracking-[0.3em]">今日签运</h3>
        <h2 className="text-4xl font-bold text-center mb-6 w-full" style={{color: '#ffd700', textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'}}>
          {result.title}
        </h2>
        <div className="text-center mb-6">
          <span className="inline-block px-6 py-1.5 bg-gradient-to-r from-purple-600/80 to-cyan-500/80 rounded-full text-white text-sm shadow-lg shadow-purple-500/20">
            {result.fortuneLevel}
          </span>
        </div>
        <p className="text-gray-300/90 text-lg leading-relaxed text-center mb-8">
          {generateCombinedOverview(result)}
        </p>
        <div className="flex justify-center">
          <button 
            onClick={onDrawAgain}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all transform hover:scale-105"
          >
            查看详情 →
          </button>
        </div>
        <p className="text-gray-500/60 text-xs text-center mt-6">
          每日仅能抽签一次
        </p>
      </div>

      {/* 今日穿搭推荐和睡眠建议 */}
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#0a0a0f]/80 backdrop-blur-md rounded-xl p-6 shadow-xl border border-purple-500/20 card-float relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full blur-2xl"></div>
          <h4 className="text-purple-400 font-medium mb-3 flex items-center gap-2">
            <span className="text-lg">👗</span> 今日穿搭推荐
          </h4>
          <p className="text-gray-300/80 text-sm leading-relaxed">
            {generateCombinedOutfit(result)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#0a0a0f]/80 backdrop-blur-md rounded-xl p-6 shadow-xl border border-cyan-500/20 card-float relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full blur-2xl"></div>
          <h4 className="text-cyan-400 font-medium mb-3 flex items-center gap-2">
            <span className="text-lg">🌙</span> 今日睡眠建议
          </h4>
          <p className="text-gray-300/80 text-sm leading-relaxed">
            {generateCombinedSleep(result)}
          </p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [showModal, setShowModal] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [fortuneResult, setFortuneResult] = useState(null)

  // 从 localStorage 加载用户信息和抽签结果
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('fortune_userInfo')
    const savedResult = localStorage.getItem('fortune_result')
    const resultDate = localStorage.getItem('fortune_resultDate')
    
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo))
    }
    
    // 检查是否是今天的抽签结果
    if (savedResult && resultDate) {
      const today = new Date().toDateString()
      if (resultDate === today) {
        setFortuneResult(JSON.parse(savedResult))
      }
    }
  }, [])

  // 周易六爻算命
  const generateFortuneResult = () => {
    if (!userInfo) return null
    
    const liuyaoResult = getTodayFortune(
      userInfo.birthDate,
      userInfo.birthHour,
      userInfo.gender
    )
    
    const tarotResult = getTarotReading(
      userInfo.birthDate,
      userInfo.birthHour,
      userInfo.gender
    )
    
    const astrologyResult = getAstrologyReading(
      userInfo.birthDate,
      userInfo.birthHour,
      userInfo.gender
    )
    
    const geomancyResult = getGeomancyReading(
      userInfo.birthDate,
      userInfo.birthHour,
      userInfo.gender
    )
    
    return {
      ...liuyaoResult,
      tarot: tarotResult,
      astrology: astrologyResult,
      geomancy: geomancyResult
    }
  }

  // 处理抽签点击
  const handleDrawFortune = () => {
    if (userInfo) {
      // 已有用户信息，直接抽签
      const result = generateFortuneResult()
      if (result) {
        result.userInfo = userInfo
        setFortuneResult(result)
        localStorage.setItem('fortune_result', JSON.stringify(result))
        localStorage.setItem('fortune_resultDate', new Date().toDateString())
      }
    } else {
      // 没有用户信息，弹窗填写
      setShowModal(true)
    }
  }

  // 处理用户信息提交
  const handleUserInfoSubmit = (data) => {
    setUserInfo(data)
    localStorage.setItem('fortune_userInfo', JSON.stringify(data))
    setShowModal(false)
    
    // 开始抽签 - 四大占卜术
    const liuyaoResult = getTodayFortune(data.birthDate, data.birthHour, data.gender)
    const tarotResult = getTarotReading(data.birthDate, data.birthHour, data.gender)
    const astrologyResult = getAstrologyReading(data.birthDate, data.birthHour, data.gender)
    const geomancyResult = getGeomancyReading(data.birthDate, data.birthHour, data.gender)
    
    const result = {
      ...liuyaoResult,
      tarot: tarotResult,
      astrology: astrologyResult,
      geomancy: geomancyResult,
      userInfo: data
    }
    
    setFortuneResult(result)
    localStorage.setItem('fortune_result', JSON.stringify(result))
    localStorage.setItem('fortune_resultDate', new Date().toDateString())
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        // 如果有抽签结果，显示结果总览
        if (fortuneResult) {
          return (
            <FortuneOverview 
              result={fortuneResult}
              onDrawAgain={() => setCurrentPage('fortune')}
            />
          )
        }
        
        // 否则显示抽签前的首页
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] relative">
            {/* 背景装饰星星 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-purple-400 rounded-full star" style={{animationDelay: '0s'}}></div>
              <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full star" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-pink-400 rounded-full star" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-yellow-400 rounded-full star" style={{animationDelay: '1.5s'}}></div>
            </div>
            
            <p className="text-sm text-purple-400/60 mb-4 tracking-[0.3em]">今日签运</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text-neon glitch-text">
              AI 算命
            </h1>
            <p className="text-xl text-gray-400 mb-8 tracking-wide">
              探索命运的奥秘，让 AI 为您解读人生
            </p>
            <button 
              onClick={handleDrawFortune}
              className="px-10 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-full hover:shadow-[0_0_40px_rgba(196,76,255,0.5)] transition-all duration-300 transform hover:scale-105 text-lg tracking-wider"
            >
              ✧ 每日一签 ✧
            </button>
            <p className="text-gray-500/50 text-xs mt-6">
              每日仅能抽签一次
            </p>
          </div>
        )
      
      case 'fortune':
        return <FortuneDetail fortuneResult={fortuneResult} setCurrentPage={setCurrentPage} />
      
      case 'contact':
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <h2 className="text-4xl font-bold mb-12 gradient-text-neon">
              联系我们
            </h2>
            <div className="w-full max-w-md bg-gradient-to-br from-[#1a1a2e]/90 to-[#0a0a0f]/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-purple-500/20 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
              
              <div className="space-y-4 text-center">
                <p className="text-gray-300 text-lg">
                  如有任何问题或建议，欢迎联系我们
                </p>
                <div className="py-6 border-t border-b border-purple-500/20">
                  <p className="text-purple-400 font-medium">邮箱</p>
                  <p className="text-white mt-2">moyejunlin@foxmail.com</p>
                </div>
                <div className="py-6 border-b border-purple-500/20">
                  <p className="text-cyan-400 font-medium">微信公众号</p>
                  <p className="text-white mt-2">kn</p>
                </div>
                <p className="text-gray-500 text-sm mt-6">
                  © 2026 AI 算命. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* 导航菜单 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div 
              className="text-xl font-bold gradient-text-neon cursor-pointer glitch-text"
              onClick={() => setCurrentPage('home')}
            >
              AI 算命
            </div>
            <div className="flex space-x-8">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`text-sm font-medium transition-all duration-300 ${currentPage === 'home' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]' : 'text-gray-400 hover:text-white'}`}
              >
                首页
              </button>
              <button 
                onClick={() => setCurrentPage('fortune')}
                className={`text-sm font-medium transition-all duration-300 ${currentPage === 'fortune' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]' : 'text-gray-400 hover:text-white'}`}
              >
                命理详解
              </button>
              <button 
                onClick={() => setCurrentPage('contact')}
                className={`text-sm font-medium transition-all duration-300 ${currentPage === 'contact' ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]' : 'text-gray-400 hover:text-white'}`}
              >
                联系我们
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 用户信息弹窗 */}
      <UserInfoModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleUserInfoSubmit}
        initialData={userInfo}
      />

      {/* 页面内容 */}
      <main className="pt-16 relative z-10">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
