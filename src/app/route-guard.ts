import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import firebase from 'firebase/app';
import "firebase/auth";

@Injectable({
    providedIn: 'root'
})
export class RouteGuard implements CanActivate {

    constructor(private router: Router) {}
    
    canActivate() {
        if (firebase.auth().currentUser) {
            return true;
        }
        else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }

}