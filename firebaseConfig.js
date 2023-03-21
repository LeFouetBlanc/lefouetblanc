// https://firebase.google.com/docs/web/setup#available-libraries
import { env } from './env.js'

const firebaseConfig = {
    apiKey: env.api_key,
    authDomain: env.authDomain,
    projectId: env.projectId,
    storageBucket: env.storageBucket,
    messagingSenderId: env.messagingSenderId,
    appId: env.appId,
    measurementId: env.measurementId,
    //databaseURL: "https://le-fouet-default-rtdb.firebaseio.com/"
    };

           
    

const app = firebase.initializeApp(firebaseConfig);



export const db = firebase.firestore();

export const dbPedidos = db.collection('pedidos')
export const dbClientes = db.collection('clientes')



