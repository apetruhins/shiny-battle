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

  get isEditMode() {
    return this.firebaseService.isEditMode
  }

  set isEditMode(isEdit: boolean) {
    this.firebaseService.isEditMode = isEdit

    if (!isEdit) {
      this.reloadComponent()
    }
  }

  get isShowAll() {
    return this.firebaseService.isShowAll
  }

  set isShowAll(showAll: boolean) {
    this.firebaseService.isShowAll = showAll
    this.reloadComponent()
  }

  get searchText() {
    return this.firebaseService.searchText
  }

  set searchText(text: string) {
    this.firebaseService.searchText = text
  }

  search() {
    this.reloadComponent()
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
}
