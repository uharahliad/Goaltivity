/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Chat from './src/pages/Chat';
import ChatRoom from './src/pages/ChatRoom';
import Group from './src/pages/Group';
import Home from './src/pages/Home';
import SignIn from './src/pages/SignIn';
import Tracker from './src/pages/Tracker';
import AddGoalItem from './src/pages/AddGoalItem';
import Welcome from './src/pages/Welcome';
import SignUp from './src/pages/SignUp';
import ForgotPassword from './src/pages/ForgotPassword';
import Survey from './src/pages/Survey';
import AddModal from './src/components/modals/AddModal';
import AddActionItem from './src/pages/AddActionItem';
import EditActionItem from './src/pages/EditActionItem';
import EditGoalItem from './src/pages/EditGoal';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setSignIn} from './src/redux/reducers/signInSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from './src/api/auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const PlusButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{top: -5, justifyContent: 'center', alignItems: 'center'}}
      onPress={onPress}>
      <View style={{width: 70, height: 70}}>{children}</View>
    </TouchableOpacity>
  );
};

const Blue = () => <View style={{flex: 1, backgroundColor: 'transparent'}} />;

const TabNavigation = () => {
  return (
    <Tab.Navigator
      mode="modal"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  height: 30,
                  backgroundColor: focused ? '#E1E7F5' : 'white',
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  color={focused ? 'black' : 'grey'}
                  name="home"
                  size={25}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 16,
                  color: focused ? 'black' : 'grey',
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Challenge"
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  height: 30,
                  backgroundColor: focused ? '#E1E7F5' : 'white',
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  color={focused ? 'black' : 'grey'}
                  name="military-tech"
                  size={25}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 16,
                  color: focused ? 'black' : 'grey',
                }}>
                Challenge
              </Text>
            </View>
          ),
        }}
        component={Tracker}
      />
      <Tab.Screen
        name="+"
        component={Blue}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('D:/goals/Goaltivity/assets/PlusButton.png')}
              style={{width: 65, height: 65}}
            />
          ),
          tabBarButton: props => <PlusButton {...props} />,
          tabBarShowLabel: false,
        }}
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate('Modal');
          },
        })}
      />
      <Tab.Screen
        name="Group"
        component={Group}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  height: 30,
                  backgroundColor: focused ? '#E1E7F5' : 'white',
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  color={focused ? 'black' : 'grey'}
                  name="group"
                  size={25}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 16,
                  color: focused ? 'black' : 'grey',
                }}>
                Group
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  height: 30,
                  backgroundColor: focused ? '#E1E7F5' : 'white',
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  color={focused ? 'black' : 'grey'}
                  name="chat"
                  size={25}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 16,
                  color: focused ? 'black' : 'grey',
                }}>
                Chat
              </Text>
            </View>
          ),
        }}
        component={Chat}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(state => state.signIn.isSignedIn);
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  useEffect(() => {
    const getUser = async () => {
      // await EncryptedStorage.clear();
      const userData = JSON.parse(await EncryptedStorage.getItem('user'));
      if (userData) {
        const validateToken = await auth.ValidateToken(userData.token);
        console.log(validateToken);
        if (validateToken.status !== 200) {
          await EncryptedStorage.clear();
        } else {
          dispatch(setSignIn(!!userData));
        }
      }
    };
    getUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen
              name="Tab"
              component={TabNavigation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Modal"
              component={AddModal}
              options={{animationEnabled: true}}
            />
            <Stack.Screen name="AddGoalItem" component={AddGoalItem} />
            <Stack.Screen name="AddActionItem" component={AddActionItem} />
            <Stack.Screen name="EditActionItem" component={EditActionItem} />
            <Stack.Screen name="EditGoalItem" component={EditGoalItem} />
            <Stack.Screen name="ChatRoom" component={ChatRoom} />
          </Stack.Group>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Survey" component={Survey} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
