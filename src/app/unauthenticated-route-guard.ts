import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import firebase from 'firebase/app';
import "firebase/auth";

@Injectable({
    providedIn: 'root'
})
export class UnauthenticatedRouteGuard implements CanActivate {

    constructor(private router: Router) {}
    
    canActivate() {
        if (firebase.auth().currentUser) {
            this.router.navigateByUrl('/');
            return false;
        }
        else {
            return true;
        }
    }

}