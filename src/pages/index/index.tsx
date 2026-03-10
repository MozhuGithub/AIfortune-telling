import { View, Text, Button, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import { getTodayFortune } from '../../lib/liuyao';
import { getTarotReading } from '../../lib/tarot';
import { getAstrologyReading } from '../../lib/astrology';
import { getGeomancyReading } from '../../lib/geomancy';
import './index.scss';

export default function Index() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [fortuneResult, setFortuneResult] = useState<any>(null);

  useEffect(() => {
    // 加载用户信息
    const savedUserInfo = Taro.getStorageSync('fortune_userInfo');
    const savedResult = Taro.getStorageSync('fortune_result');
    const resultDate = Taro.getStorageSync('fortune_resultDate');
    
    if (savedUserInfo) {
      setUserInfo(savedUserInfo);
    }
    
    // 检查是否是今天的抽签结果
    if (savedResult && resultDate) {
      const today = new Date().toDateString();
      if (resultDate === today) {
        setFortuneResult(savedResult);
      }
    }
  }, []);

  const handleDrawFortune = () => {
    if (!userInfo) {
      // 跳转到填写信息页面（tabBar页面用switchTab）
      Taro.switchTab({ url: '/pages/profile/profile' });
      return;
    }
    
    // 生成运势
    const result = {
      ...getTodayFortune(userInfo.birthDate, userInfo.birthHour, userInfo.gender),
      tarot: getTarotReading(userInfo.birthDate, userInfo.birthHour, userInfo.gender),
      astrology: getAstrologyReading(userInfo.birthDate, userInfo.birthHour, userInfo.gender),
      geomancy: getGeomancyReading(userInfo.birthDate, userInfo.birthHour, userInfo.gender),
      userInfo,
    };
    
    setFortuneResult(result);
    Taro.setStorageSync('fortune_result', result);
    Taro.setStorageSync('fortune_resultDate', new Date().toDateString());
    
    // 跳转到结果页
    Taro.navigateTo({ url: '/pages/fortune/fortune' });
  };

  return (
    <View className='container'>
      {/* 顶部装饰 */}
      <View className='header'>
        <View className='outer-ring' />
        <View className='middle-ring' />
        <View className='inner-circle'>
          <Text className='bagua'>☰</Text>
        </View>
      </View>
      
      {/* 标题 */}
      <View className='title-section'>
        <Text className='title'>AI 算命</Text>
        <Text className='subtitle'>智见未来 · 命由心造</Text>
      </View>
      
      {/* 抽签按钮 */}
      {!fortuneResult ? (
        <View className='action-section'>
          <Button className='draw-btn' onClick={handleDrawFortune}>
            <Text className='btn-text'>开始测算</Text>
          </Button>
          <Text className='hint'>
            {userInfo ? '点击开始今日运势测算' : '请先完善个人信息'}
          </Text>
        </View>
      ) : (
        <View className='result-section'>
          <View className='result-card'>
            <Text className='result-title'>今日运势</Text>
            <Text className='fortune-level'>{fortuneResult.level}</Text>
            <Text className='fortune-summary'>{fortuneResult.summary}</Text>
          </View>
          <Button className='detail-btn' onClick={() => Taro.switchTab({ url: '/pages/fortune/fortune' })}>
            查看详情
          </Button>
        </View>
      )}
      
      {/* 底部装饰 */}
      <View className='footer'>
        <Text className='footer-text'>仅供娱乐参考</Text>
      </View>
    </View>
  );
}
