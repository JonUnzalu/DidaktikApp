import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {LokalizazioakService} from './../../service/lokalizazioak.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';


declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public folder: string;
  txt: any;
  stringify: any;
  map = null;
  latitudMapa = 0.0;
  longitudMapa = 0.0;

  markersJson: Marker[] = [{
    position: {
      lat: 0.0,
      lng: 0.0,
    },
    title: ''
  }];

  constructor(private geolocation: Geolocation, public lokalizazioaService: LokalizazioakService) {
  }
  
  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitudMapa = resp.coords.latitude;
      this.longitudMapa = resp.coords.longitude;

      this.getLokalizazioak();
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  ngOnInit() {
    this.getCurrentCoordinates();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: this.latitudMapa, lng: this.longitudMapa};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 18
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.renderMarkers();
      mapEle.classList.add('show-map');
    });

  /**  let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      let latLng = new google.maps.LatLng(data)
      let marker = new google.maps.Marker({
        map: this.map,
        icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
          new google.maps.Size(22, 22),
          new google.maps.Point(0, 18),
          new google.maps.Point(11, 11)),
        position: latLng
      });
    
      let content = "<h4>You are here</h4>";
      this.addInfoWindow(marker, content);
    }); **/
  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  getLokalizazioak() {
    this.lokalizazioaService.lokalizazioak().then(data => {
      this.txt = JSON.stringify(data);
      this.stringify = JSON.parse(this.txt);

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < this.stringify.length; i++) {
        const markerToAdd = {position: {
            lat: 0.0,
            lng: 0.0, },
        title: ''} as Marker;

        markerToAdd.title = this.stringify[i].izena;
        markerToAdd.position.lng = parseFloat(this.stringify[i].longitudea);
        markerToAdd.position.lat = parseFloat(this.stringify[i].latitudea);

        this.markersJson.push(markerToAdd);
      }

      this.loadMap();
    });
  }


  addMarker(marker: Marker) {
    const imageGreen = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    const imageRed = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

    let mapMarker = new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title,
      icon: imageRed
    });

    var infowindow = new google.maps.InfoWindow({
      size: new google.maps.Size(500, 500)
    });

    let content =
    "<ion-card>"+
      "<ion-card-header>"+
        "<ion-card-title style='text-align: center;'>" + mapMarker.title +"</ion-card-title>"+
      "</ion-card-header> "+
      "<ion-button (click)='lanzarPopUp()' style='text-align: center;'>SARTU</ion-button>"+
    "</ion-card>"

    google.maps.event.addListener(mapMarker, 'click', function () {
      infowindow.setContent(content);
      infowindow.open(this.map, mapMarker);
    });

    return mapMarker;
  }

  lanzarPopUp(){
  }

  renderMarkers() {
    this.markersJson.forEach(marker => {
      if(marker.title != ''){
        this.addMarker(marker);
      }
    });
  }


}
