import firebase from 'firebase';

const config = {
	apiKey: "AIzaSyC3cT_7E_A2sDYxoClHYaeg5lqBMpCH_Wc",
    authDomain: "vue-app-1ca0c.firebaseapp.com",
    databaseURL: "https://vue-app-1ca0c.firebaseio.com",
    projectId: "vue-app-1ca0c"
}

export default firebase.initializeApp(config);