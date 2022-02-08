import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Hasiera', url: '/folder/Hasiera', icon: 'home' },
    { title: 'Mapa', url: '/game', icon: 'map' },
    { title: 'Erabiltzailea', url: '/login', icon: 'man' },
  ];

  public labelsFull = ['Dolores Ibarruri estatua', 'Gallarta berriaren monumentua','Gallarta zaharraren monumentua: Burdina', 'Meategia', 'Mineral garbitokia', 'Meatze-trenbidea', 'Tiranoko meatzaritza ospitalea (Prebentorioa)', 'Euskal Herriko meatzaritza museoa'];
  public labels = []

  constructor() {}
}
