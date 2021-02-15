import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import "firebase/auth";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false

  constructor() { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(userData => {
      if (userData) {
        this.isLoggedIn = true
      }
      else {
        this.isLoggedIn = false
      }
    })
  }

  logout() {
    console.log('Logout pressed')
  }

}
