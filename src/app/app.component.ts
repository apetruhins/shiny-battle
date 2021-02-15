import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Shiny Battle';

  ngOnInit(): void {
    firebase.initializeApp(environment.firebaseConfig)
  }
}
