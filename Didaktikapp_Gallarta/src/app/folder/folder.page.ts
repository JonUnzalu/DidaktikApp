import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';
import {PopupPage} from '../popup/popup.page';
import {TestjokoaPage} from '../testjokoa/testjokoa.page';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {
  public folder: string;
  txt: any;
  stringify: any;

  // eslint-disable-next-line max-len
  constructor(private activatedRoute: ActivatedRoute, public popoverController: PopoverController, private route: Router) {
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  async abrirPopover( ev: any){
    const popover = await this.popoverController.create({
      animated: true,
      component: PopupPage,
      cssClass: 'guri-bu',
      event: ev,
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

