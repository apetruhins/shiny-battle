import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

import { environment } from '../environments/environment';
import { Pokemon } from './models/pokemon';
import { User } from './models/user';
import { Users } from './models/users';

import { GENERATIONS } from './models/generations';
import { Generation } from './models/generation';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn: boolean = false
  isEditMode = false

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

    let userId = this.getUserId();
    let users = new Users()

    await firebase.firestore().collection('users')
      .get().then(querySnapshot => {
        querySnapshot.forEach(u => {
          let userData = u.data()
          let user = new User()

          user.userId = u.id
          user.name = userData.name

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

  async getGenerations(users: Users): Promise<Generation[]> {
    let generations: Generation[] = GENERATIONS
    let dbPokemons = []

    await firebase.firestore().collection('pokemons')
      .get().then(querySnapshot => {
        querySnapshot.forEach(p => {
          let dbUsers = p.data().users

          let dbPokemon = {
            code: p.id,
            user1: dbUsers.includes(users.user1.userId),
            user2: dbUsers.includes(users.user2.userId)
          }

          dbPokemons.push(dbPokemon)
        })
      })
      .catch(() => {})

    for (let generation of generations) {
      for (let pokemon of generation.pokemons) {
        const dbPokemon = dbPokemons.find(p => p.code == pokemon.code)

        if (dbPokemon) {
          pokemon.user1 = dbPokemon.user1
          pokemon.user2 = dbPokemon.user2

          if (pokemon.user1) {
            users.user1.pokemonCount += 1
          }

          if (pokemon.user2) {
            users.user2.pokemonCount += 1
          }
        }
      }
    }

    return generations
  }

  async updatePokemon(pokemon: Pokemon, users: Users) {
    if (pokemon.user1 || pokemon.user2) {

      let userIds = []

      if (pokemon.user1) {
        userIds.push(users.user1.userId)
      }

      if (pokemon.user2) {
        userIds.push(users.user2.userId)
      }

      // Update
      await firebase.firestore().collection("pokemons").doc(pokemon.code).set({
        users: userIds
      })
      .then(() => { })
      .catch(error => { })
    }
    else {
      // Delete
      await firebase.firestore().collection("pokemons").doc(pokemon.code).delete()
      .then(() => { })
      .catch(error => { })
    }
  }
}
