import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import './fortune.scss';

export default function Fortune() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const savedResult = Taro.getStorageSync('fortune_result');
    if (savedResult) {
      setResult(savedResult);
    }
  }, []);

  if (!result) {
    return (
      <View className='container'>
        <Text className='empty-text'>暂无运势数据，请先抽签</Text>
      </View>
    );
  }

  return (
    <ScrollView scrollY className='container'>
      <View className='header'>
        <Text className='title'>今日运势详情</Text>
      </View>
      
      {/* 六爻 */}
      <View className='section'>
        <Text className='section-title'>🔮 六爻占卜</Text>
        <View className='card'>
          <Text className='level'>运势等级: {result.level}</Text>
          <Text className='content'>{result.summary}</Text>
          {result.details && <Text className='details'>{result.details}</Text>}
        </View>
      </View>
      
      {/* 塔罗 */}
      {result.tarot && (
        <View className='section'>
          <Text className='section-title'>🃏 塔罗牌</Text>
          <View className='card'>
            <Text className='card-name'>{result.tarot.card}</Text>
            <Text className='meaning'>{result.tarot.meaning}</Text>
          </View>
        </View>
      )}
      
      {/* 星座 */}
      {result.astrology && (
        <View className='section'>
          <Text className='section-title'>⭐ 星座运势</Text>
          <View className='card'>
            <Text className='content'>{result.astrology.reading}</Text>
          </View>
        </View>
      )}
      
      {/* 风水 */}
      {result.geomancy && (
        <View className='section'>
          <Text className='section-title'>🏠 风水堪舆</Text>
          <View className='card'>
            <Text className='content'>{result.geomancy.advice}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
