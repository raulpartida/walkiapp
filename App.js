import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthContext} from './src/Context';
import {baseURL} from './src/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import Favorites from './src/scenes/Favorites/Favorites';
import Login from './src/scenes/Login/Login';
import Menu from './src/scenes/Menu/Menu';
import Main from './src/scenes/Main/Main';
import Shop from './src/scenes/Shop/Shop';
import SignUp from './src/scenes/SignUp/SignUp';
import Promotion from './src/scenes/Promotion/Promotion';
import Mall from './src/scenes/Mall/Mall';
import Beacon from './src/scenes/Beacon/Beacon';
import Help from './src/scenes/Help/Help';
import EditProfile from './src/scenes/EditProfile/EditProfile';
import Join from './src/scenes/JoinToWalki/JoinToWalki';
import NewPass from './src/scenes/NewPassword/NewPassword';
import Profile from './src/scenes/Profile/Profile';
import SplashScreen from './src/scenes/SplashScreen/SplashScreen';
import QRScanner from './src/scenes/QRScanner/QRScanner';
import PasswordRecovery from './src/scenes/PasswordRecovery/PasswordRecovery';
import Icon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';

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

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}>
    <Tabs.Screen name="Home" component={Main} />
    <Tabs.Screen name="QR Code" component={QRScanner} />
    <Tabs.Screen name="Favorites" component={Favorites} />
  </Tabs.Navigator>
);

async function _loginHandle(user = '', password = '', dispatch) {
  try {
    let hash = await fetch(baseURL + '/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user,
        password: password,
        getEncrypt: true,
      }),
    })
      .then(response => {
        var contentType = response.headers.get('content-type');
        if (contentType !== 'application/json; charset=utf-8')
          return response.text();
        else return null;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    try {
      if (hash != null) {
        await AsyncStorage.setItem('token', hash);
        dispatch({type: 'SIGN_IN', token: hash});
      } else {
        Toast.show('Error de acceso, verifica las credenciales.', Toast.SHORT);
      }
    } catch (error) {
      console.log(error.message);
    }
    return hash;
  } catch (error) {}
}

const App: () => React$Node = () => {
  const [isLoading, setIsLoading] = React.useState(true);

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
            isLoading: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            isLoading: false,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  const authContext = React.useMemo(
    () => ({
      signIn: (user, password) => {
        let userToken = null;
        if (user !== '' && password !== '')
          userToken = _loginHandle(user, password, dispatch);
      },
      signOut: async () => {
        try {
          dispatch({type: 'SIGN_OUT'});
          await AsyncStorage.getAllKeys().then(keys =>
            AsyncStorage.multiRemove(keys),
          );
        } catch (error) {}
      },
    }),
    [],
  );

  React.useEffect(() => {
    setTimeout(() => {
      const bootstrapAsync = async () => {
        let userToken;
        try {
          userToken = await AsyncStorage.getItem('token');
        } catch (e) {}
        dispatch({type: 'RESTORE_TOKEN', token: userToken});
      };
      bootstrapAsync();
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.isLoading ? (
          <SplashScreen />
        ) : state.userToken ? (
          <HomeStack.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}>
            <HomeStack.Screen name="Home" component={TabStackScreen} />
            <HomeStack.Screen name="Menu" component={Menu} />
            <HomeStack.Screen name="Shop" component={Shop} />
            <HomeStack.Screen name="Promotion" component={Promotion} />
            <HomeStack.Screen name="Mall" component={Mall} />
            <HomeStack.Screen name="Beacon" component={Beacon} />
            <HomeStack.Screen name="Help" component={Help} />
            <HomeStack.Screen name="Join" component={Join} />
            <HomeStack.Screen name="Profile" component={Profile} />
            <HomeStack.Screen name="EditProfile" component={EditProfile} />
            <HomeStack.Screen name="NewPassword" component={NewPass} />
            <HomeStack.Screen
              name="PasswordRecovery"
              component={PasswordRecovery}
            />
          </HomeStack.Navigator>
        ) : (
          <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <AuthStack.Screen name="SignIn" component={Login} />
            <AuthStack.Screen name="SignUp" component={SignUp} />
            <AuthStack.Screen name="Splash" component={SplashScreen} />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
