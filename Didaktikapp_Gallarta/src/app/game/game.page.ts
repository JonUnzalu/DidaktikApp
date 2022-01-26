import { Component, OnInit } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import {LokalizazioakService} from './../../service/lokalizazioak.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TestjokoaPage } from '../testjokoa/testjokoa.page';
import { VideoPage } from '../video/video.page';
import {HutsuneakbetePage} from '../hutsuneakbete/hutsuneakbete.page';
import {LetraordenatuPage} from "../letraordenatu/letraordenatu.page";


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

  constructor(private geolocation: Geolocation, public lokalizazioaService: LokalizazioakService, public popoverController: PopoverController) {
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
    //const myLatLng = {lat: this.latitudMapa, lng: this.longitudMapa};
    const myLatLng = {lat: 43.3150917000, lng: -3.074205555555};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 18
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.renderMarkers();
      mapEle.classList.add('show-map');
    });
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
      size: new google.maps.Size(500, 500),
      enableEventPropagation: true
    });

    let content =
    "<ion-card style='margin:auto; text-align: center'>"+
      "<ion-card-header>"+
        "<ion-card-title id='kokapenIzena' style='text-align: center; margin: auto; font-size: 15px'>" + mapMarker.title +"</ion-card-title>"+
      "</ion-card-header> "+
      "<ion-button id='sartuBtn' style='text-align: center; width: 55px;height: 35px;'>SARTU</ion-button>"+
    "</ion-card>"



    google.maps.event.addListener(mapMarker, 'click', function () {
      infowindow.setContent(content);
      infowindow.open(this.map, mapMarker);
    });

    infowindow.addListener('domready', () => {
      document.getElementById("sartuBtn").addEventListener("click", () => {
        this.lanzarPopUp(document.getElementById("kokapenIzena").innerHTML);
      });
    });

    return mapMarker;
  }
  lanzarPopUp(kokapena){
    switch(kokapena){
      case "Euskal Herriko meatzaritza museoa":
        break;

      case "Gallarta berriaren monumentua":
        this.abrirVideo('1', '../../assets/video/video_jard2.mp4', 'Hasi galdetegia');
        break;
      case "Tiranoko meatzaritza ospitalea (Prebentorioa)":
        this.abrirVideo('2', '../../assets/video/video_jard7.mp4', 'Hasi galdetegia');
        break;
      case "Dolores Ibarruri estatua":
        this.abrirVideo('3', '../../assets/video/video_jard1.mp4', 'Hasi galdetegia');
        break;
    };
  }

  renderMarkers() {
    this.markersJson.forEach(marker => {
      if(marker.title != ''){
        this.addMarker(marker);
      }
    });
  }

  async abrirVideo(ekintza, videoUrl, botoiEkintza){
    const popover = await this.popoverController.create({
      animated: true,
      component: VideoPage,
      cssClass: 'video-play',
      translucent: true,
      backdropDismiss: false,
      componentProps: {
        video: videoUrl,
        ekintza: botoiEkintza,
        controller: this.popoverController
      }
    });
    await popover.present();

    //Esperar a que se cierre el video
    await popover.onDidDismiss();

    //Cuando el video se cierre lanzamos el popup
    if(ekintza==="1"){
      this.abrirJuego(TestjokoaPage, 'test-joko');
    }
    else if(ekintza==="2"){
      this.abrirJuego(HutsuneakbetePage, 'hutsuneak-bete');
    }
    else if(ekintza==="3"){
      this.abrirJuego(LetraordenatuPage, 'letra-ordenatu');
    }
  }

  async abrirJuego(pageName, cssClass){
    const popover = await this.popoverController.create({
      animated: true,
      component: pageName,
      cssClass: cssClass,
      translucent: true,
      backdropDismiss: false,
      componentProps: {
        controller: this.popoverController
      }
    });

    await popover.present();

    await popover.onDidDismiss();

    await this.abrirVideo('0', '../../assets/video/video_jard1amaiera.mp4', 'Itxi');
  }

}
