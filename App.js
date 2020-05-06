import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import Favorites from './src/scenes/Favorites/Favorites';
import Login from './src/scenes/Login/Login';
import Menu from './src/scenes/Menu/Menu';
import Main from './src/scenes/Main/Main';
import Shop from './src/scenes/Shop/Shop';
import SignUp from './src/scenes/SignUp/SignUp';
import Promotion from './src/scenes/Promotion/Promotion';
import Help from './src/scenes/Help/Help';
import EditProfile from './src/scenes/EditProfile/EditProfile';
import Join from './src/scenes/JoinToWalki/JoinToWalki';
import NewPass from './src/scenes/NewPassword/NewPassword';
import Profile from './src/scenes/Profile/Profile';
import SplashScreen from './src/scenes/SplashScreen/SplashScreen';
import QRScanner from './src/scenes/QRScanner/QRScanner';
import IconButton from './src/components/IconButton';

const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const HomeStackScreens = () => (
  <HomeStack.Navigator
    initialRouteName="Main"
    screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="Main" component={Main} />
    <HomeStack.Screen name="Menu" component={Menu} />
  </HomeStack.Navigator>
);

const TabStackScreen = () => (
  <Tabs.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home';
        } else if (route.name === 'QR Code') {
          iconName = focused ? 'qrcode' : 'qrcode';
        } else if (route.name === 'Favorites') {
          iconName = focused ? 'star' : 'staro';
        }

        return <IconButton name={iconName} size={size} color={color} />;
      },
    })}>
    <Tabs.Screen name="Home" component={Main} />
    <Tabs.Screen name="QR Code" component={QRScanner} />
    <Tabs.Screen name="Favorites" component={Favorites} />
  </Tabs.Navigator>
);

const App: () => React$Node = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const AuthContext = React.createContext();
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        setIsLoading(false);
      } catch (e) {
        // Restoring token failed
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({type: 'SIGN_IN', token: 'JKL4R5A#1'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  if (isLoading) return <SplashScreen />;

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? (
          <HomeStack.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}>
            <HomeStack.Screen name="Home" component={TabStackScreen} />
            <HomeStack.Screen name="Menu" component={Menu} />
            <HomeStack.Screen name="Shop" component={Shop} />
            <HomeStack.Screen name="Promotion" component={Promotion} />
            <HomeStack.Screen name="Help" component={Help} />
            <HomeStack.Screen name="Join" component={Join} />
            <HomeStack.Screen name="Profile" component={Profile} />
            <HomeStack.Screen name="EditProfile" component={EditProfile} />
            <HomeStack.Screen name="NewPassword" component={NewPass} />
          </HomeStack.Navigator>
        ) : (
          <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <AuthStack.Screen
              name="SignIn"
              component={Login}
              options={{
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
            <AuthStack.Screen name="SignUp" component={SignUp} />
            <AuthStack.Screen name="Splash" component={SplashScreen} />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
