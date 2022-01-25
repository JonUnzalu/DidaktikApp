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
    { title: 'Erabiltzailea', url: '/folder/Erabiltzea', icon: 'man' },
  ];

  public labels = [''];
  constructor() {}
}
