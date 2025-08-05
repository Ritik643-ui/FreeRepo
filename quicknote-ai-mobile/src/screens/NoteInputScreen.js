import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NoteInputScreen = ({ navigation }) => {
  const [noteText, setNoteText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!noteText.trim()) {
      Alert.alert('Empty Note', 'Please enter some text to summarize.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: noteText,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to summarize');
      }

      const summaryData = await response.json();
      
      // Navigate to summary screen with the data
      navigation.navigate('Summary', { summaryData });
      
      // Clear the input after successful submission
      setNoteText('');
    } catch (error) {
      console.error('Error summarizing:', error);
      Alert.alert(
        'Error', 
        'Failed to summarize your note. Please check your connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearText = () => {
    setNoteText('');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4 pt-4">
          {/* Header */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-gray-900 mb-2">
              📝 New Note
            </Text>
            <Text className="text-gray-600 text-base">
              Paste your messy notes or transcripts below and let AI organize them for you.
            </Text>
          </View>

          {/* Text Input Area */}
          <View className="flex-1 mb-4">
            <View className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <TextInput
                className="p-4 text-base text-gray-900 min-h-[300px]"
                placeholder="Start typing or paste your notes here..."
                placeholderTextColor="#8E8E93"
                value={noteText}
                onChangeText={setNoteText}
                multiline
                textAlignVertical="top"
                style={{
                  fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
                  fontSize: 16,
                  lineHeight: 22,
                }}
              />
              
              {/* Character count and clear button */}
              {noteText.length > 0 && (
                <View className="flex-row justify-between items-center px-4 py-2 bg-gray-50 border-t border-gray-200">
                  <Text className="text-gray-500 text-sm">
                    {noteText.length} characters
                  </Text>
                  <TouchableOpacity
                    onPress={clearText}
                    className="px-3 py-1 rounded-full bg-gray-200"
                  >
                    <Text className="text-gray-700 text-sm font-medium">Clear</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          {/* Sample text suggestions */}
          <View className="mb-6">
            <Text className="text-gray-600 text-sm font-medium mb-3">
              💡 Try pasting:
            </Text>
            <View className="space-y-2">
              <Text className="text-gray-500 text-sm">
                • Meeting transcripts or voice memos
              </Text>
              <Text className="text-gray-500 text-sm">
                • Brainstorming sessions or random thoughts
              </Text>
              <Text className="text-gray-500 text-sm">
                • Research notes or article highlights
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action Button */}
        <View className="px-4 pb-4 pt-2 bg-gray-50">
          <TouchableOpacity
            onPress={handleSummarize}
            disabled={isLoading || !noteText.trim()}
            className={`py-4 rounded-xl flex-row justify-center items-center ${
              isLoading || !noteText.trim()
                ? 'bg-gray-300'
                : 'bg-blue-500 shadow-lg'
            }`}
            style={{
              shadowColor: '#007AFF',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            {isLoading ? (
              <>
                <ActivityIndicator color="white" size="small" />
                <Text className="text-white font-semibold text-lg ml-2">
                  Summarizing...
                </Text>
              </>
            ) : (
              <>
                <Text className="text-white font-semibold text-lg">
                  ✨ Summarize with AI
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NoteInputScreen;

