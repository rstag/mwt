import { Component, OnInit } from '@angular/core';
import { AddroomPage } from '../addroom/addroom.page';
import { HomePage } from '../home/home.page';
import  firebase from 'Firebase';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {

  rooms = [];
  ref = firebase.database().ref('chatrooms/');
  nav: any;
  nickname: any;

  constructor(private route: ActivatedRoute,private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.nav = this.router.getCurrentNavigation().extras.state;
      }
    
    if(this.nav){
      this.nickname= this.nav.nickname;
      console.log(this.nickname)
    }
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
      console.log(resp)
    });
  });
  }

  ngOnInit() {
  }

  addRoom() {
    let  navg: NavigationExtras
    
    navg = { state: {} };
    this.router.navigate(['addroom'],navg);
    // this.navCtrl.push(AddRoomPage);
  }
  joinRoom(key) {
    console.log(key)
    console.log(this.nickname)
    let  navg: NavigationExtras
    
    navg = { state: {key:key,nickname:this.nickname} };
    this.router.navigate(['home'],navg);
    // this.navCtrl.setRoot(HomePage, {
    //   key:key,
    //   nickname:this.navParams.get("nickname")
    // });
  }
}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      console.log(item)
      returnArr.push(item);
  });

  return returnArr;
};

