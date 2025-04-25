import { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { router } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

SplashScreen.preventAutoHideAsync().catch(() => {
  // Ignore error
});

export default function SplashScreenComponent() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {
        // Ignore error
      });

      const timer = setTimeout(() => {
        router.replace('/auth/login');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <View style={styles.steamOne} />
            <View style={styles.steamTwo} />
            <View style={styles.cup} />
          </View>
        </View>
        <Text style={styles.title}>Coffee Shop</Text>
        <Text style={styles.slogan}>Brewing happiness daily</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8D4B9',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoWrapper: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  cup: {
    width: 80,
    height: 80,
    backgroundColor: '#6F4E37',
    borderRadius: 40,
    position: 'absolute',
    bottom: 0,
    left: 20,
    transform: [{ scaleX: 1.2 }],
  },
  steamOne: {
    width: 8,
    height: 20,
    backgroundColor: '#6F4E37',
    position: 'absolute',
    top: 0,
    left: 40,
    borderRadius: 4,
    transform: [{ rotate: '-15deg' }],
  },
  steamTwo: {
    width: 8,
    height: 20,
    backgroundColor: '#6F4E37',
    position: 'absolute',
    top: 0,
    right: 40,
    borderRadius: 4,
    transform: [{ rotate: '15deg' }],
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#6F4E37',
    marginBottom: 8,
  },
  slogan: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#6F4E37',
    opacity: 0.8,
  },
});