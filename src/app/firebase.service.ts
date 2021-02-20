import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

import { environment } from '../environments/environment';
import { Pokemon } from './models/pokemon';
import { User } from './models/user';
import { Users } from './models/users';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn: boolean = false

  constructor() { }

  initialize() {
    firebase.initializeApp(environment.firebaseConfig)

    this.isLoggedIn = this.getUser() !== null

    firebase.auth().onAuthStateChanged(user => {
      if (user){
        localStorage.setItem('user', JSON.stringify(user))
        this.isLoggedIn = true
      } else {
        localStorage.setItem('user', null)
        this.isLoggedIn = false
      }
    })

    this.loadPokemons()
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  getUserId(): string {
    const user = this.getUser()

    if (user) {
      return user.uid
    }

    return null
  }

  login(username: string, password: string) {
    let email = `${username}@${environment.domain}`
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  logout() {
    return firebase.auth().signOut()
  }

  async getUsers(): Promise<Users> {

    var userId = this.getUserId();
    var users = new Users()

    await firebase.firestore().collection('users')
      .get().then(querySnapshot => {
        querySnapshot.forEach(u => {
          var userData = u.data()
          var user = new User()

          user.userId = u.id
          user.name = userData.name
          user.pokemons = userData.pokemons

          if (user.userId === userId) {
            users.user1 = user
          }
          else {
            users.user2 = user
          }
       })
      })
      .catch(() => {})

    return users
  }

  async getPokemons(users: Users, full: boolean): Promise<Pokemon[]> {
    let pokemons: Pokemon[] = []

    await firebase.firestore().collection('pokemons')
      .get().then(querySnapshot => {
        querySnapshot.forEach(p => {
          var pokemonData = p.data()
          var pokemon = new Pokemon()

          pokemon.code = p.id
          pokemon.imgUrl = pokemonData.imgUrl
          pokemon.name = pokemonData.name
          pokemon.name2 = pokemonData.name2
          pokemon.number = pokemonData.number

          pokemon.user1 = users.user1.pokemons.includes(pokemon.code)
          pokemon.user2 = users.user2.pokemons.includes(pokemon.code)

          if (!full || pokemon.user1 || pokemon.user2) {
            pokemons.push(pokemon)
          }
       })
      })
      .catch(() => {})

    return pokemons
  }

  loadPokemons() {
    
  }
}
