import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';
import {PopupPage} from '../popup/popup.page';
import {TestjokoaPage} from '../testjokoa/testjokoa.page';
import {LokalizazioakService} from './../../service/lokalizazioak.service';

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
  constructor(private activatedRoute: ActivatedRoute, public popoverController: PopoverController, private route: Router, public lokalizazioaService: LokalizazioakService) {
  }

  getLokalizazioak() {
    this.lokalizazioaService.lokalizazioak().then(data => {
      this.txt = JSON.stringify(data);

      this.stringify = JSON.parse(this.txt);

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < this.stringify.length; i++) {
        alert(this.stringify[i].latitudea + '' + this.stringify[i].longitudea );
      }
      // alert(this.txt);
    });
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
  async abrirJuego( ev: any){
    const popover = await this.popoverController.create({
      animated: true,
      component: TestjokoaPage,
      cssClass: 'test-joko',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  maparaJoan() {
    this.route.navigate(['/game']);
  }
}

