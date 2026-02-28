import { useState, useEffect } from 'react'

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">请填写您的基本信息</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2 text-sm">您的姓名</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="请输入姓名"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2 text-sm">出生日期</label>
            <input 
              type="date" 
              required
              value={formData.birthDate}
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2 text-sm">出生时辰</label>
            <select 
              required
              value={formData.birthHour}
              onChange={(e) => setFormData({...formData, birthHour: e.target.value})}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
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
            <label className="block text-gray-300 mb-2 text-sm">性别</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="gender" 
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-4 h-4 accent-purple-500"
                />
                <span className="text-gray-300">男</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="gender" 
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-4 h-4 accent-purple-500"
                />
                <span className="text-gray-300">女</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              取消
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
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
function FortuneOverview({ result, userInfo, onDrawAgain }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-center mb-6">
          {result.title}
        </h2>
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm">
            {result.fortuneLevel}
          </span>
        </div>
        <p className="text-gray-200 text-lg leading-relaxed text-center mb-8">
          {result.overview}
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            重新抽签
          </button>
          <button 
            onClick={onDrawAgain}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            查看详情
          </button>
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

  // 模拟抽签结果
  const generateFortuneResult = () => {
    const fortunes = [
      {
        title: '上上签',
        fortuneLevel: '大吉大利',
        overview: '命格清贵，贵人相助。事业方面将有重大突破，贵人运极佳，有望得到上司赏识或遇到重要合作伙伴。感情运势平稳向上，单身者有望邂逅良缘，已婚者家庭和睦。财运亨通，可适当投资理财。健康方面注意劳逸结合，保持良好作息。此签暗示您正处人生上升期，把握机遇，勇往直前。',
        details: {
          career: '事业运势极佳，贵人相助，有望升职加薪或遇到重要合作机会。',
          love: '感情运势平稳，单身者有望遇到心仪对象，已婚者家庭幸福美满。',
          wealth: '财运亨通，正财偏财皆有收获，可适当投资理财。',
          health: '健康运势良好，注意劳逸结合，保持规律作息。'
        }
      },
      {
        title: '上签',
        fortuneLevel: '吉星高照',
        overview: '运势向好，稳中有进。事业方面进展顺利，虽然可能遇到一些小挑战，但都能迎刃而解。感情方面需要多一些耐心和包容，真诚待人会有意外收获。财运平稳，不宜冒进，宜稳健理财。健康方面注意饮食均衡，适量运动。此签提示您保持积极心态，稳扎稳打必有收获。',
        details: {
          career: '事业稳步发展，可能有小挑战但能顺利解决。',
          love: '感情需要耐心经营，真诚待人会有好结果。',
          wealth: '财运平稳，不宜冒险投资，宜稳健理财。',
          health: '健康无大碍，注意饮食和适量运动。'
        }
      },
      {
        title: '中签',
        fortuneLevel: '平稳顺利',
        overview: '运势平稳，不急不躁。事业方面保持现状即可，不宜有大的变动，静待时机成熟。感情方面可能有些许波折，需要多沟通理解，用心经营。财运一般，不宜投机，宜守不宜攻。健康方面注意情绪调节，保持心情愉悦。此签暗示您当前宜静不宜动，韬光养晦，蓄势待发。',
        details: {
          career: '事业平稳，不宜有大的变动，静待时机。',
          love: '感情有些波折，需要多沟通和包容。',
          wealth: '财运一般，不宜投机取巧，守成为上。',
          health: '注意情绪管理，保持心态平和。'
        }
      }
    ]
    return fortunes[Math.floor(Math.random() * fortunes.length)]
  }

  // 处理抽签点击
  const handleDrawFortune = () => {
    if (userInfo) {
      // 已有用户信息，直接抽签
      const result = generateFortuneResult()
      result.userInfo = userInfo
      setFortuneResult(result)
      localStorage.setItem('fortune_result', JSON.stringify(result))
      localStorage.setItem('fortune_resultDate', new Date().toDateString())
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
    
    // 开始抽签
    const result = generateFortuneResult()
    result.userInfo = data
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
              userInfo={userInfo}
              onDrawAgain={() => setCurrentPage('fortune')}
            />
          )
        }
        
        // 否则显示抽签前的首页
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-pulse drop-shadow-2xl mb-8">
              AI Fortune Telling
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              探索命运的奥秘，让 AI 为您解读人生
            </p>
            <button 
              onClick={handleDrawFortune}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              每日一签
            </button>
          </div>
        )
      
      case 'fortune':
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8">
              命理详解
            </h2>
            {fortuneResult ? (
              <div className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">{fortuneResult.title}</h3>
                  <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm">
                    {fortuneResult.fortuneLevel}
                  </span>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <h4 className="text-purple-400 font-medium mb-2">💼 事业运</h4>
                    <p className="text-gray-300">{fortuneResult.details.career}</p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <h4 className="text-pink-400 font-medium mb-2">💕 感情运</h4>
                    <p className="text-gray-300">{fortuneResult.details.love}</p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <h4 className="text-yellow-400 font-medium mb-2">💰 财运</h4>
                    <p className="text-gray-300">{fortuneResult.details.wealth}</p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <h4 className="text-green-400 font-medium mb-2">🏥 健康运</h4>
                    <p className="text-gray-300">{fortuneResult.details.health}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <p>您还没有抽签，请先返回首页进行抽签</p>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  去抽签
                </button>
              </div>
            )}
          </div>
        )
      
      case 'contact':
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-12">
              联系我们
            </h2>
            <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
              <div className="space-y-4 text-center">
                <p className="text-gray-300 text-lg">
                  如有任何问题或建议，欢迎联系我们
                </p>
                <div className="py-6 border-t border-b border-gray-700">
                  <p className="text-purple-400 font-medium">邮箱</p>
                  <p className="text-white mt-2">contact@aifortune.example.com</p>
                </div>
                <div className="py-6 border-b border-gray-700">
                  <p className="text-purple-400 font-medium">微信公众号</p>
                  <p className="text-white mt-2">AI算命大师</p>
                </div>
                <p className="text-gray-400 text-sm mt-6">
                  © 2026 AI Fortune Telling. All rights reserved.
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* 导航菜单 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div 
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              AI Fortune
            </div>
            <div className="flex space-x-8">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}
              >
                首页
              </button>
              <button 
                onClick={() => setCurrentPage('fortune')}
                className={`text-sm font-medium transition-colors ${currentPage === 'fortune' ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}
              >
                命理详解
              </button>
              <button 
                onClick={() => setCurrentPage('contact')}
                className={`text-sm font-medium transition-colors ${currentPage === 'contact' ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}
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
      <main className="pt-16">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
