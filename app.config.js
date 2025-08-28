import 'dotenv/config';

export default {
  name: 'MetalsPriceApp',
  slug: 'metals-price-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.yourname.metalspriceapp'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.yourname.metalspriceapp'
  },
  web: {
    favicon: './assets/favicon.png'
  },
  extra: {
    goldApiKey: process.env.GOLDAPI_KEY, // 👈 read from .env file
    baseCurrency: 'INR',
    useMock: true // set to false if you want to hit goldapi.io
  }
};
