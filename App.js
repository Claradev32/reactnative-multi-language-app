// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LanguageProvider } from './contexts/LanguageContext';
import ArticleScreen from './screens/ArticleScreen';
import HomeScreen from './screens/HomeScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Blog" component={HomeScreen}  options={{ headerShown: false }}
 />
          <Stack.Screen name="Article" component={ArticleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
};

export default App;
