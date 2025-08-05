# QuickNote AI - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Navigate to the mobile app directory:**
   ```bash
   cd quicknote-ai-mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run on your preferred platform:**
   - **iOS Simulator:** Press `i` in the terminal or run `npm run ios`
   - **Android Emulator:** Press `a` in the terminal or run `npm run android`
   - **Physical Device:** Scan the QR code with Expo Go app
   - **Web Browser:** Press `w` in the terminal or run `npm run web`

## 🔧 Configuration

### Backend URL
The app is currently configured to POST to `http://localhost:8080/api/summarize`. To change this:

1. Open `src/screens/NoteInputScreen.js`
2. Find the `fetch` call in the `handleSummarize` function
3. Replace the URL with your backend endpoint

### Styling
The app uses NativeWind (Tailwind CSS for React Native). You can customize:
- Colors in `tailwind.config.js`
- Component styles directly in the JSX using Tailwind classes

## 📱 Testing

### Without Backend
The app includes error handling for when the backend is not available. You can test the UI by:
1. Entering text in the note input
2. Tapping "Summarize with AI"
3. The app will show an error message since localhost:8080 won't be available

### With Mock Data
To test with mock data, you can temporarily modify the `handleSummarize` function in `NoteInputScreen.js` to use the demo data from `src/components/DemoData.js`.

## 🛠 Development Tips

### Hot Reload
Expo provides hot reload by default. Save any file and see changes instantly.

### Debugging
- Use `console.log()` for debugging - logs appear in the terminal
- Use React Native Debugger for advanced debugging
- Expo DevTools provide additional debugging options

### Platform-Specific Code
Use `Platform.OS` to write platform-specific code:
```javascript
import { Platform } from 'react-native';

const styles = Platform.OS === 'ios' ? iosStyles : androidStyles;
```

## 📦 Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## 🔍 Troubleshooting

### Common Issues

1. **Metro bundler issues:**
   ```bash
   npx expo start --clear
   ```

2. **Node modules issues:**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **iOS Simulator not opening:**
   - Make sure Xcode is installed
   - Check that iOS Simulator is available

4. **Android emulator issues:**
   - Ensure Android Studio is installed
   - Check that an Android Virtual Device (AVD) is created

### Getting Help
- Check the [Expo documentation](https://docs.expo.dev/)
- Visit [React Native documentation](https://reactnative.dev/docs/getting-started)
- Check [NativeWind documentation](https://www.nativewind.dev/) for styling issues

---

Happy coding! 🎉

