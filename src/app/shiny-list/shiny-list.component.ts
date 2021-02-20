import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
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
  pokemons: Pokemon[] = []

  async ngOnInit() {
    if (!this.firebaseService.isLoggedIn) {
      this.router.navigateByUrl('/login')
    }

    this.users = await this.firebaseService.getUsers()
    this.pokemons = await this.firebaseService.getPokemons(this.users, false)
  }
}
