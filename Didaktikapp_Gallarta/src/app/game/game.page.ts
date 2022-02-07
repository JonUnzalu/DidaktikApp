import { Component, OnInit } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { LokalizazioakService } from './../../service/lokalizazioak.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TestjokoaPage } from '../testjokoa/testjokoa.page';
import { VideoPage } from '../video/video.page';
import { HutsuneakbetePage } from '../hutsuneakbete/hutsuneakbete.page';
import { LetraordenatuPage } from "../letraordenatu/letraordenatu.page";


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

  markers: Marker[] = [
    {
      position: {
        lat: 43.3172139999999,
        lng: -3.074152777777778,
      },
      title: 'Dolores Ibarruri estatua'
    },
    {
      position: {
        lat: 43.3150917,
        lng: -3.074205555555556,
      },
      title: 'Gallarta berriaren monumentua'
    },
    {
      position: {
        lat: 43.3115889,
        lng: -3.073341666666667,
      },
      title: 'Gallarta zaharraren monumentua: Burdina'
    },
    {
      position: {
        lat: 43.3107722,
        lng: -3.0748027777777778,
      },
      title: 'Meategia'
    },
    {
      position: {
        lat: 43.3115778,
        lng: -3.0714305555555557,
      },
      title: 'Mineral garbitokia'
    },
    {
      position: {
        lat: 43.3113306,
        lng: -3.0715583333333334,
      },
      title: 'Meatze-trenbidea'
    },
    {
      position: {
        lat: 43.3124111,
        lng: -3.0754916666666667,
      },
      title: 'Tiranoko meatzaritza ospitalea (Prebentorioa)'
    },
    {
      position: {
        lat: 43.3116222,
        lng: -3.0702333333333334,
      },
      title: 'Euskal Herriko meatzaritza museoa'
    },
  ];

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

      this.loadMap();
      //this.getLokalizazioak();
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
    const myLatLngGeo = {lat: this.latitudMapa, lng: this.longitudMapa};
    const myLatLng = { lat: 43.3150917000, lng: -3.074205555555 };
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 18
    });

    this.renderMarkers();

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      console.log("he pasado por aqui")

      var marker = new google.maps.Marker({
        position: myLatLngGeo,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillOpacity: 1,
          strokeWeight: 2,
          fillColor: '#5384ED',
          strokeColor: '#ffffff',
        }
      });

      var circle = new google.maps.Circle({
        center: marker.getPosition(),
        radius: 100,
        fillColor: "#0000FF",
        fillOpacity: 0.1,
        map: this.map,
        strokeColor: "#FFFFFF",
        strokeOpacity: 0.1,
        strokeWeight: 2
      });

      marker.setMap(this.map);

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
        const markerToAdd = {
          position: {
            lat: 0.0,
            lng: 0.0,
          },
          title: ''
        } as Marker;

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
      "<ion-card style='margin:auto; text-align: center'>" +
      "<ion-card-header>" +
      "<ion-card-title id='kokapenIzena' style='text-align: center; margin: auto; font-size: 15px'>" + mapMarker.title + "</ion-card-title>" +
      "</ion-card-header> " +
      "<ion-button id='sartuBtn' style='text-align: center; width: 55px;height: 35px;'>SARTU</ion-button>" +
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
  lanzarPopUp(kokapena) {
    switch (kokapena) {
      case "Euskal Herriko meatzaritza museoa":
        this.abrirVideo('8', '../../assets/video/video_jard8.mp4', 'Hasi jokoa');
        break;

      case "Gallarta berriaren monumentua":
        this.abrirVideo('1', '../../assets/video/video_jard2.mp4', 'Hasi galdetegia');
        break;
      case "Tiranoko meatzaritza ospitalea (Prebentorioa)":
        this.abrirVideo('2', '../../assets/video/video_jard7.mp4', 'Hasi jokoa');
        break;
      case "Dolores Ibarruri estatua":
        this.abrirVideo('3', '../../assets/video/video_jard1.mp4', 'Hasi jokoa');
        break;
      case "Gallarta zaharraren monumentua: Burdina":
        this.abrirVideo('4', '../../assets/video/video_jard3.mp4', 'Hasi jokoa');
        break;
      case "Meategia":
        this.abrirVideo('5', '../../assets/video/video_jard4.mp4', 'Hasi jokoa');
        break;
      case "Meatze-trenbidea":
        this.abrirVideo('6', '../../assets/video/video_jard6.mp4', 'Hasi jokoa');
        break;
      case "Mineral garbitokia":
        this.abrirVideo('7', '../../assets/video/video_jard5.mp4', 'Hasi jokoa');
        break;
    };
  }

  renderMarkers() {
    this.markers.forEach(marker => {
      if (marker.title != '') {
        this.addMarker(marker);
      }
    });
  }

  async abrirVideo(ekintza, videoUrl, botoiEkintza) {
    const popover = await this.popoverController.create({
      animated: true,
      component: VideoPage,
      cssClass: 'video-play',
      translucent: true,
      backdropDismiss: true,
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
    if (ekintza === "1") {
      this.abrirJuego(TestjokoaPage, 'test-joko');
    }
    else if (ekintza === "2") {
      this.abrirJuego(HutsuneakbetePage, 'hutsuneak-bete');
    }
    else if (ekintza === "3") {
      this.abrirJuego(LetraordenatuPage, 'letra-ordenatu');
    }
  }

  async abrirJuego(pageName, cssClass) {
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
