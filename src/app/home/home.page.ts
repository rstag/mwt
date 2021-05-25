import { Component, ViewChild } from '@angular/core';
import { RoomPage } from '../room/room.page';
import  firebase from 'Firebase';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
// import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NavController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // @ViewChild(Content) content: Content;
  data = { type:'', nickname:'', message:'' };
  chats = [];
  roomkey:string;
  nickname:string;
  offStatus:boolean = false;
  nav: { [k: string]: any; };

  constructor(private route: ActivatedRoute,private router: Router) {
    console.log("homepage chat")
    this.route.queryParams.subscribe(params => {
      console.log("hh")
      if (this.router.getCurrentNavigation().extras.state) {
        this.nav = this.router.getCurrentNavigation().extras.state;
      }
    // });
    if(this.nav){
      this.nickname= this.nav.nickname;
      this.roomkey= this.nav.key;
    
    // this.roomkey = this.navParams.get("key") as string;
    // this.nickname = this.navParams.get("nickname") as string;
    this.data.type = 'message';
    this.data.nickname = this.nickname;
  console.log(this.roomkey)
    let joinData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
    joinData.set({
      type:'join',
      user:this.nickname,
      message:this.nickname+' has joined this room.',
      sendDate:Date()
    });
    this.data.message = '';
  
    firebase.database().ref('chatrooms/'+this.roomkey+'/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if(this.offStatus === false) {
          // this.content.scrollToBottom(300);
        }
      }, 1000);
    });
  }
});
  }
  sendMessage() {
    console.log(this.roomkey)
    let newData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
    newData.set({
      type:this.data.type,
      user:this.data.nickname,
      message:this.data.message,
      sendDate:Date()
    });
    this.data.message = '';
  }
  exitChat() {
    let exitData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
    exitData.set({
      type:'exit',
      user:this.nickname,
      message:this.nickname+' has exited this room.',
      sendDate:Date()
    });
  
    this.offStatus = true;
    let  navg: NavigationExtras
    
    navg = { state: {nickname:this.nickname} };
    this.router.navigate(['room'],navg);
  
    // this.navCtrl.setRoot(RoomPage, {
    //   nickname:this.nickname
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