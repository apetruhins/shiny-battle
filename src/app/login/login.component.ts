import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = ''
  password = ''

  constructor(private router: Router, private firebaseService: FirebaseService) { }
  ngOnInit(): void {
    if (this.firebaseService.isLoggedIn()) {
      this.router.navigateByUrl('/')
    }
  }

  async login() {
    if (!this.email || !this.password) {
      return
    }

    await this.firebaseService.login(this.email, this.password)
    this.router.navigateByUrl('/')
  }

}
