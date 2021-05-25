import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { NavController } from '@ionic/angular';
import  firebase from 'Firebase';


@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.page.html',
  styleUrls: ['./addroom.page.scss'],
})
export class AddroomPage implements OnInit {

  data = { roomname:'' };
  ref = firebase.database().ref('chatrooms/');
  constructor(private router: Router
    // public navCtrl: NavController
    ) { }

  ngOnInit() {
  }

  addRoom() {
    let newData = this.ref.push();
    newData.set({
      roomname:this.data.roomname
    });
    this.router.navigate(['room']);
    // this.router.dispose()
    // this.navCtrl.pop();
  }

}
