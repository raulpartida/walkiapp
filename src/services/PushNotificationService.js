import firebase from 'react-native-firebase';

//Método para obtener el device token único
const getToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }
};

//Método para solicitar permisos para notificaciones
const requestPermission = async () =>
  firebase
    .messaging()
    .requestPermission()
    .then(() => {
      getToken();
    })
    .catch(error => {
      console.warn(`${error} permission rejected`);
    });

//Método para verificar si el permiso de notificaciones está habilitado
export const checkPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
    getToken();
  } else {
    requestPermission();
  }
};

//Método para recibir las push y mostrarlas
export const notificationListener = () =>
  firebase.notifications().onNotification(notification => {
    const {
      notifications: {
        Android: {
          Priority: {Max},
        },
      },
    } = firebase;
    notification.android.setChannelId(CHANNEL_NOTIFICATIONS.CHANNEL_ID);
    notification.android.setPriority(Max);
    notification.setData(notification.data);
    firebase.notifications().displayNotification(notification);
  });

//Método para crear el canal el cual recibirá la notificación
export const createChannel = () => {
  const channel = new firebase.notifications.Android.Channel(
    CHANNEL_NOTIFICATIONS.CHANNEL_ID,
    CHANNEL_NOTIFICATIONS.CHANNEL_NAME,
    firebase.notifications.Android.Importance.Max,
  ).setDescription(CHANNEL_NOTIFICATIONS.CHANNEL_DESCRIPTION);
  firebase.notifications().android.createChannel(channel);
};
