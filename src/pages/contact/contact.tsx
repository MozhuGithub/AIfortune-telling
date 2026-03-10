import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './contact.scss';

export default function Contact() {
  const handleCopy = (text: string) => {
    Taro.setClipboardData({
      data: text,
      success: () => {
        Taro.showToast({ title: '已复制', icon: 'success' });
      }
    });
  };

  return (
    <View className='container'>
      <View className='card'>
        <Text className='title'>联系我们</Text>
        
        <View className='info-item'>
          <Text className='label'>客服微信</Text>
          <View className='value-row'>
            <Text className='value'>AI_Fortune_Service</Text>
            <Button className='copy-btn' size='mini' onClick={() => handleCopy('AI_Fortune_Service')}>
              复制
            </Button>
          </View>
        </View>
        
        <View className='info-item'>
          <Text className='label'>邮箱</Text>
          <View className='value-row'>
            <Text className='value'>service@aifortune.com</Text>
            <Button className='copy-btn' size='mini' onClick={() => handleCopy('service@aifortune.com')}>
              复制
            </Button>
          </View>
        </View>
      </View>
      
      <View className='tips'>
        <Text className='tips-title'>⚠️ 免责声明</Text>
        <Text className='tips-content'>
          本小程序仅供娱乐参考，所有测算结果均为随机生成，不代表任何真实预测。
          请理性看待，切勿迷信。
        </Text>
      </View>
    </View>
  );
}
