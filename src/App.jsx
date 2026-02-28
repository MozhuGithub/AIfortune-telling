import { useState, useEffect } from 'react'
import { getTodayFortune } from './lib/liuyao'
import { getTarotReading } from './lib/tarot'

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
        {fortuneResult.tarot && (
          <div className="bg-gradient-to-br from-[#1a1a2e]/90 to-[#0a0a0f]/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-pink-500/20 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            
            <h3 className="text-xl font-bold text-pink-400 mb-4 flex items-center gap-2">
              <span>🃏</span> 塔罗牌
              <span className="text-sm font-normal text-gray-500 ml-2">{fortuneResult.tarot.level}</span>
            </h3>

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
          </div>
        )}

        {/* 3. 占星术（待实现） */}
        <div className="bg-gradient-to-br from-[#1a1a2e]/90 to-[#0a0a0f]/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-blue-500/20 relative opacity-50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          
          <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
            <span>⭐</span> 占星术
            <span className="text-sm font-normal text-gray-500 ml-2">即将上线</span>
          </h3>
          
          <p className="text-gray-400 text-sm">根据您的出生星盘，分析今日行星运行对您的影响...</p>
        </div>

        {/* 4. 地占术（待实现） */}
        <div className="bg-gradient-to-br from-[#1a1a2e]/90 to-[#0a0a0f]/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-green-500/20 relative opacity-50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
          
          <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
            <span>🌍</span> 地占术
            <span className="text-sm font-normal text-gray-500 ml-2">即将上线</span>
          </h3>
          
          <p className="text-gray-400 text-sm">古老的西方占卜术，通过大地符号解读命运...</p>
        </div>
      </div>
    </div>
  )
}

// 用户信息弹窗组件
function UserInfoModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    birthDate: initialData?.birthDate || '',
    birthHour: initialData?.birthHour || '',
    gender: initialData?.gender || ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        birthDate: initialData.birthDate || '',
        birthHour: initialData.birthHour || '',
        gender: initialData.gender || ''
      })
    }
  }, [initialData, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  if (!isOpen) return null

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
            <input 
              type="date" 
              required
              value={formData.birthDate}
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
              className="w-full px-4 py-3 bg-[#0a0a0f]/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,212,255,0.3)] transition-all"
            />
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
          {result.overview}
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
            {result.outfit}
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#0a0a0f]/80 backdrop-blur-md rounded-xl p-6 shadow-xl border border-cyan-500/20 card-float relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full blur-2xl"></div>
          <h4 className="text-cyan-400 font-medium mb-3 flex items-center gap-2">
            <span className="text-lg">🌙</span> 今日睡眠建议
          </h4>
          <p className="text-gray-300/80 text-sm leading-relaxed">
            {result.sleep}
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
    
    return {
      ...liuyaoResult,
      tarot: tarotResult
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
    
    // 开始抽签 - 同时获取六爻和塔罗
    const liuyaoResult = getTodayFortune(
      data.birthDate,
      data.birthHour,
      data.gender
    )
    
    const tarotResult = getTarotReading(
      data.birthDate,
      data.birthHour,
      data.gender
    )
    
    const result = {
      ...liuyaoResult,
      tarot: tarotResult,
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
                  <p className="text-white mt-2">contact@aifortune.example.com</p>
                </div>
                <div className="py-6 border-b border-purple-500/20">
                  <p className="text-cyan-400 font-medium">微信公众号</p>
                  <p className="text-white mt-2">AI算命大师</p>
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
