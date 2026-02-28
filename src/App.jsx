import { useState } from 'react'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-pulse drop-shadow-2xl mb-8">
              AI Fortune Telling
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              探索命运的奥秘，让 AI 为您解读人生
            </p>
            <button 
              onClick={() => setCurrentPage('fortune')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              开始测算
            </button>
          </div>
        )
      
      case 'fortune':
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-12">
              命理详解
            </h2>
            <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">您的姓名</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="请输入姓名"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">出生日期</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">出生时辰</label>
                  <select className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors">
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
                <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
                  开始测算
                </button>
              </div>
            </div>
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

      {/* 页面内容 */}
      <main className="pt-16">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
