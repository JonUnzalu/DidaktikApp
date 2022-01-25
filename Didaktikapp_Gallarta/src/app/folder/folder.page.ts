import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';
import {PopupPage} from '../popup/popup.page';
import {TestjokoaPage} from '../testjokoa/testjokoa.page';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {
  public folder: string;
  txt: any;
  stringify: any;

  erabiltzailea: string;

  // eslint-disable-next-line max-len
  constructor(private activatedRoute: ActivatedRoute, public popoverController: PopoverController, private route: Router) {
  }

  ngOnInit() {
    this.erabiltzailea = localStorage.getItem('erabiltzailea')
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async abrirPopoverUsername(){
    const popover = await this.popoverController.create({
      animated: true,
      component: LoginPage,
      cssClass: 'guri-bu',
      translucent: true
    });
    return await popover.present();
  }

  async abrirPopover(){
    const popover = await this.popoverController.create({
      animated: true,
      component: PopupPage,
      cssClass: 'guri-bu',
      translucent: true
    });
    return await popover.present();
  }
  maparaJoan() {
    this.route.navigate(['/game']);
  }

  irten(){
    
  }
}

