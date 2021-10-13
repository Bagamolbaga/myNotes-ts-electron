import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import md5 from 'md5'

const firebaseConfig = {
  apiKey: 'AIzaSyBbotDfEGOIWINmMa0JkO5jnBM5n-Wv6ss',
  authDomain: 'mynotes-27fe6.firebaseapp.com',
  projectId: 'mynotes-27fe6',
  storageBucket: 'mynotes-27fe6.appspot.com',
  messagingSenderId: '1030387612315',
  appId: '1:1030387612315:web:56a593447740df6109a43e',
  measurementId: 'G-G96MFEDKE5'
}

firebase.initializeApp(firebaseConfig)

const storageRef = firebase.storage().ref()

export const uploadPhoto = async (file: any): Promise<any> => {
  const snap = await storageRef.child(`${md5(file.name)}.jpg`).put(file)
  const url = await snap.ref.getDownloadURL()
  return url
}

export default firebase
