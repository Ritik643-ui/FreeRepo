# QuickNote AI - Mobile App

A beautiful React Native mobile app built with Expo that helps users organize and summarize their messy notes using AI.

## 🚀 Features

- **Clean iOS Notes-style UI** - Minimal and intuitive design
- **Note Input Screen** - Easy text input with character count and clear functionality
- **AI Summarization** - POST to `/api/summarize` endpoint for AI processing
- **Summary Display** - Beautiful formatted summary with title, content, tags, and sentiment
- **Cross-platform** - Works on both iOS and Android
- **Navigation** - Smooth navigation between screens using React Navigation

## 📱 Screens

### 1. Note Input Screen
- Clean text input area for pasting messy notes or transcripts
- Character counter and clear button
- "Summarize with AI" button that POSTs to the backend
- Loading state with activity indicator
- Helpful suggestions for what to paste

### 2. Summary Screen
- **Title** - Bold, large title from AI response
- **Summary** - Scrollable text block with the AI-generated summary
- **Tags** - Styled as pill badges
- **Sentiment** - Mood indicator (positive/negative/neutral) with emoji
- **Actions** - Share summary and create new note buttons
- **Back navigation** to return to note input

## 🛠 Tech Stack

- **React Native** with Expo
- **React Navigation** for screen navigation
- **NativeWind** (Tailwind CSS for React Native) for styling
- **Functional Components** with React Hooks
- **SafeAreaView** for proper screen boundaries

## 🎨 Design

- **iOS Notes-inspired** clean and minimal design
- **Tailwind CSS** styling with custom color palette
- **Responsive** layout that works on different screen sizes
- **Accessibility** friendly with proper contrast and touch targets

## 📦 API Integration

The app makes a POST request to `http://localhost:8080/api/summarize` with the following format:

```javascript
// Request
{
  "text": "User's input text here..."
}

// Expected Response
{
  "title": "AI Generated Title",
  "summary": "AI generated summary of the content...",
  "tags": ["tag1", "tag2", "tag3"],
  "sentiment": "positive" // or "negative" or "neutral"
}
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on device:**
   - **iOS:** `npm run ios`
   - **Android:** `npm run android`
   - **Web:** `npm run web`

## 📁 Project Structure

```
quicknote-ai-mobile/
├── App.js                 # Main app component with navigation
├── src/
│   ├── screens/
│   │   ├── NoteInputScreen.js    # Note input and submission
│   │   └── SummaryScreen.js      # Display AI summary
│   └── components/               # Reusable components (future)
├── package.json
├── app.json              # Expo configuration
├── babel.config.js       # Babel configuration for NativeWind
└── tailwind.config.js    # Tailwind CSS configuration
```

## 🎯 Key Features Implemented

- ✅ **Functional Components Only** - No class components used
- ✅ **React Hooks** - useState for state management
- ✅ **Clean UI** - iOS Notes-style design
- ✅ **Navigation** - Stack navigation between screens
- ✅ **API Integration** - Fetch POST to backend endpoint
- ✅ **Loading States** - Activity indicators during API calls
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Cross-platform** - Works on iOS and Android
- ✅ **Responsive Design** - Adapts to different screen sizes

## 🔧 Configuration

The app is configured to work with:
- **Backend URL:** `http://localhost:8080/api/summarize` (easily replaceable)
- **Expo SDK 49**
- **React Navigation 6**
- **NativeWind 2.0** for Tailwind CSS styling

## 📱 Screenshots

The app features a clean, minimal design similar to Apple Notes with:
- Rounded corners and subtle shadows
- iOS-style navigation
- Beautiful color scheme with blue accents
- Smooth animations and transitions
- Proper keyboard handling

## 🚀 Next Steps

To connect to a real backend:
1. Replace `http://localhost:8080/api/summarize` with your actual API endpoint
2. Add authentication if needed
3. Implement offline storage for summaries
4. Add more customization options

---

Built with ❤️ using React Native and Expo

