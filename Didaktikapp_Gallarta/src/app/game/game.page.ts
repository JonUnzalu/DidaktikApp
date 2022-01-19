import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {LokalizazioakService} from './../../service/lokalizazioak.service';


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
      title: 'Gallarta berriaren montumentua'
    },
    {
      position: {
        lat: 43.3115889,
        lng: -3.073341666666667,
      },
      title: 'Gallarta zaharraren montumentua: Burdina'
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
      lat: 11.3172139999999,
      lng: 11.074152777777778,
    },
    title: 'aaaa'
  }];

  constructor(public lokalizazioaService: LokalizazioakService) {
  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.getLokalizazioak();

    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: 43.3172139999999, lng: -3.0742055555};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 18
    });

    alert("Mapa zabalduko da.");

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.renderMarkers();
      mapEle.classList.add('show-map');
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
    console.log('aaaaaaa');
  }

  renderMarkers() {
    this.markersJson.forEach(marker => {
      this.addMarker(marker);
    });
  }


}
