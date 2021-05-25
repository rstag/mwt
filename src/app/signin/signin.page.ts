import { Component, OnInit } from '@angular/core';
import { RoomPage } from  '../room/room.page';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  data = { nickname:"" };
  nav:  any; ;

  constructor(private route: ActivatedRoute,private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.nav = this.router.getCurrentNavigation().extras.state;
      }
    });
    if(this.nav){
      // this.ppl= this.nav.ppl;
      // // this.ppl= this.nav.members;
    }
   }

  ngOnInit() {
  }

  enterNickname() {
    let  navg: NavigationExtras
    
    navg = { state: {nickname: this.data.nickname} };
    this.router.navigate(['room'],navg);

    // this.navCtrl.setRoot(RoomPage, {
    //   nickname: this.data.nickname
    // });
  }

}
