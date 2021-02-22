import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Generation } from '../models/generation';
import { Pokemon } from '../models/pokemon';
import { Users } from '../models/users';

@Component({
  selector: 'app-shiny-list',
  templateUrl: './shiny-list.component.html',
  styleUrls: ['./shiny-list.component.css']
})
export class ShinyListComponent implements OnInit {

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  users: Users = new Users()
  generations: Generation[] = []

  async ngOnInit() {
    if (!this.firebaseService.isLoggedIn) {
      this.router.navigateByUrl('/login')
    }

    this.users = await this.firebaseService.getUsers()
    this.generations = await this.firebaseService.getGenerations(this.users)
  }

  async checkedChanged($event, pokemon: Pokemon, userNumber: number) {
    if (userNumber === 1) {
      pokemon.user1 = $event.target.checked
    }
    else {
      pokemon.user2 = $event.target.checked
    }

    await this.firebaseService.updatePokemon(pokemon, this.users)
  }

  isEditMode() {
    return this.firebaseService.isEditMode
  }
}
