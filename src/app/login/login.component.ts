import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''

  constructor(private router: Router, private firebaseService: FirebaseService) { }
  ngOnInit(): void {
    if (this.firebaseService.isLoggedIn) {
      this.router.navigateByUrl('/')
    }
  }

  login() {
    if (!this.username || !this.password) {
      return
    }
    
    this.firebaseService.login(this.username, this.password)
      .then(user => {
        if (user) {
          this.firebaseService.isLoggedIn = false
          this.router.navigateByUrl('/')
        }
      })
      .catch(() => {})
  }

}
