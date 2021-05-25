import { Component } from '@angular/core';
// import * as firebase from 'firebase';
import  firebase  from 'firebase';
import { SigninPage } from './signin/signin.page';


const config = {
  apiKey: '1:232020195510:android:11e6b34c604d8041090e17',
  authDomain: 'fbpushapp-default-rtdb.firebaseapp.com',
  // authDomain: 'fbpushapp.firebaseapp.com',
  // databaseURL: 'https://fbpushapp.firebaseio.com/',
  databaseURL: 'https://fbpushapp-default-rtdb.firebaseio.com',
  projectId: 'fbpushapp',
  storageBucket: 'fbpushapp.appspot.com'
  // storageBucket: 'gs://fbpushapp.appspot.com/',
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  rootPage:any = SigninPage;
  constructor() {
    firebase.initializeApp(config);
    console.log("init fb")
    // fb.initializeApp(config)
  }
}
