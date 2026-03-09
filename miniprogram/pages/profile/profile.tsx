import { View, Text, Input, Button, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState, useEffect } from 'react';
import './profile.scss';

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    birthDate: '',
    birthHour: '',
    gender: '男',
  });
  const [genderSel, setGenderSel] = useState(0);
  const genderOptions = ['男', '女'];
  const [editCount, setEditCount] = useState(0);

  useEffect(() => {
    const saved = Taro.getStorageSync('fortune_userInfo');
    if (saved) {
      setUserInfo(saved);
      setGenderSel(saved.gender === '女' ? 1 : 0);
    }
    
    const savedCount = Taro.getStorageSync('fortune_editCount');
    const countDate = Taro.getStorageSync('fortune_editCountDate');
    const today = new Date().toDateString();
    if (savedCount && countDate === today) {
      setEditCount(savedCount);
    }
  }, []);

  const handleGenderChange = (e) => {
    const idx = e.detail.value;
    setGenderSel(idx);
    setUserInfo({ ...userInfo, gender: genderOptions[idx] });
  };

  const handleSave = () => {
    // 检查修改次数
    if (userInfo.name && Taro.getStorageSync('fortune_userInfo')) {
      if (editCount >= 2) {
        Taro.showToast({ title: '今日修改次数已达上限', icon: 'none' });
        return;
      }
      const newCount = editCount + 1;
      setEditCount(newCount);
      Taro.setStorageSync('fortune_editCount', newCount);
      Taro.setStorageSync('fortune_editCountDate', new Date().toDateString());
    }

    if (!userInfo.name || !userInfo.birthDate || !userInfo.birthHour) {
      Taro.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }

    Taro.setStorageSync('fortune_userInfo', userInfo);
    Taro.showToast({ title: '保存成功', icon: 'success' });
    
    setTimeout(() => {
      Taro.switchTab({ url: '/pages/index/index' });
    }, 1500);
  };

  return (
    <View className='container'>
      <View className='form'>
        <View className='form-item'>
          <Text className='label'>姓名</Text>
          <Input
            className='input'
            placeholder='请输入姓名'
            value={userInfo.name}
            onInput={(e) => setUserInfo({ ...userInfo, name: e.detail.value })}
          />
        </View>
        
        <View className='form-item'>
          <Text className='label'>出生日期</Text>
          <Input
            className='input'
            placeholder='如: 1990-01-01'
            value={userInfo.birthDate}
            onInput={(e) => setUserInfo({ ...userInfo, birthDate: e.detail.value })}
          />
        </View>
        
        <View className='form-item'>
          <Text className='label'>出生时辰</Text>
          <Input
            className='input'
            placeholder='如: 子时 或 23:00'
            value={userInfo.birthHour}
            onInput={(e) => setUserInfo({ ...userInfo, birthHour: e.detail.value })}
          />
        </View>
        
        <View className='form-item'>
          <Text className='label'>性别</Text>
          <Picker
            mode='selector'
            range={genderOptions}
            value={genderSel}
            onChange={handleGenderChange}
          >
            <View className='picker'>{genderOptions[genderSel]}</View>
          </Picker>
        </View>
        
        <Button className='save-btn' onClick={handleSave}>
          保存信息
        </Button>
        
        {editCount > 0 && (
          <Text className='hint'>今日已修改 {editCount}/2 次</Text>
        )}
      </View>
    </View>
  );
}
