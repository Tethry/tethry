import { BlurView } from 'expo-blur';
import { Platform, View } from 'react-native';

export function TabBarBackground() {
  if (Platform.OS === 'ios') {
    return <BlurView intensity={100} style={{ position: 'absolute', width: '100%', height: '100%' }} />;
  }
  return <View style={{ backgroundColor: '#fff', position: 'absolute', width: '100%', height: '100%' }} />;
} 