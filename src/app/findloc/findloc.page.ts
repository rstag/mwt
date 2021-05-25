import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController } from '@ionic/angular';
// import { Geolocation } from '@ionic-native/geolocation';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


declare var google;

@Component({
  selector: 'app-findloc',
  templateUrl: './findloc.page.html',
  styleUrls: ['./findloc.page.scss'],
})
export class FindlocPage implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;
  // @ViewChild('map') mapElement: ElementRef;
  // map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;


  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  apikeygmaps='AIzaSyBo99LNECkN1QEHv2g14GUM56AI5K_arAE'
  lat = 51.678418;
  lng = 7.809007;

  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };

  constructor(public navCtrl: NavController, 
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) { }

  ngOnInit() {
    // this.initMap();
    this.loadMap();
  }
  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('dragend', () => {

        this.latitude = this.map.center.lat();
        this.longitude = this.map.center.lng();

        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });

  }

  initMap() {
    console.log("call initmap")
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });

    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}

// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { NavController } from '@ionic/angular';
// // import { Geolocation } from '@ionic-native/geolocation';

// declare var google;

// @Component({
//   selector: 'app-findloc',
//   templateUrl: './findloc.page.html',
//   styleUrls: ['./findloc.page.scss'],
// })
// export class FindlocPage implements OnInit {

//   @ViewChild('map') mapElement: ElementRef;
//   map: any;
//   start = 'chicago, il';
//   end = 'chicago, il';
//   directionsService = new google.maps.DirectionsService;
//   directionsDisplay = new google.maps.DirectionsRenderer;


//   latitude: any = 0; //latitude
//   longitude: any = 0; //longitude
//   apikeygmaps='AIzaSyBo99LNECkN1QEHv2g14GUM56AI5K_arAE'
//   lat = 51.678418;
//   lng = 7.809007;

//   options = {
//     timeout: 10000, 
//     enableHighAccuracy: true, 
//     maximumAge: 3600
//   };

//   constructor(public navCtrl: NavController, private geolocation: Geolocation) { }

//   ngOnInit() {
//     // this.initMap();
//   }

//   initMap() {
//     console.log("call initmap")
//     this.map = new google.maps.Map(this.mapElement.nativeElement, {
//       zoom: 7,
//       center: {lat: 41.85, lng: -87.65}
//     });

//     this.directionsDisplay.setMap(this.map);
//   }

//   calculateAndDisplayRoute() {
//     this.directionsService.route({
//       origin: this.start,
//       destination: this.end,
//       travelMode: 'DRIVING'
//     }, (response, status) => {
//       if (status === 'OK') {
//         this.directionsDisplay.setDirections(response);
//       } else {
//         window.alert('Directions request failed due to ' + status);
//       }
//     });
//   }


//   getCurrentCoordinates() {
//     this.geolocation.getCurrentPosition().then((resp) => {
//       this.latitude = resp.coords.latitude;
//       this.longitude = resp.coords.longitude;
//      }).catch((error) => {
//        console.log('Error getting location', error);
//      });
//   }

// }
