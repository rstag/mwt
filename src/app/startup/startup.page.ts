import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.page.html',
  styleUrls: ['./startup.page.scss'],
})
export class StartupPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotosingin() {
    this.router.navigate(['signin']);
  }

  gotolocation() {
    this.router.navigate(['findloc']);
  }

}
