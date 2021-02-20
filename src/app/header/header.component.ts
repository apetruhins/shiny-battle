import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit(): void { }

  logout() {
    this.firebaseService.logout()
      .then(() => {
        this.firebaseService.isLoggedIn = false
        this.router.navigateByUrl('/login')
      })
      .catch(() => {})
  }

  isLoggedIn() {
    return this.firebaseService.isLoggedIn
  }

}
