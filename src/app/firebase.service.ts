import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import "firebase/auth";

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  initialize() {
    firebase.initializeApp(environment.firebaseConfig)

    firebase.auth().onAuthStateChanged(user => {
      if (user){
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.setItem('user', null)
      }
    })
  }

  isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  async login(email: string, password: string) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
  }

  async logout() {
    await firebase.auth().signOut()
  }
}
