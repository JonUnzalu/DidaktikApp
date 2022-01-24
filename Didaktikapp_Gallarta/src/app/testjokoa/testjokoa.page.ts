import {Component, Input, OnInit} from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';

interface Galdera {
  galdera: string;
  erantzuna: string;
  erantzuna2: string;
  erantzuna3: string;
  erantzuna4: string;
  erantzunz: string;
}

@Component({
  selector: 'app-testjokoa',
  templateUrl: './testjokoa.page.html',
  styleUrls: ['./testjokoa.page.scss'],
})


export class TestjokoaPage implements OnInit {
  public gald: string;
  public era: string;
  public era2: string;
  public era3: string;
  public era4: string;
  public aukeratutakoerantzuna: string;
  public indexGalderak: number;
  @Input() controller: PopoverController;
  public colorVar1: string;
  public colorVar2: string;
  public colorVar3: string;
  public colorVar4: string;


  public era3Visible = true;
  public era4Visible = true;


  constructor(public popoverController: PopoverController, public alertController: AlertController) {
  }

  ngOnInit() {
    this.gald = this.galderakarray[0].galdera;
    this.era = this.galderakarray[0].erantzuna;
    this.era2 = this.galderakarray[0].erantzuna2;
    this.era3 = this.galderakarray[0].erantzuna3;
    this.era4 = this.galderakarray[0].erantzuna4;
    this.indexGalderak = 0;

    this.colorVar1 = "white"
    this.colorVar2 = "white"
    this.colorVar3 = "white"
    this.colorVar4 = "white"

    if (this.era3 === '') {
      this.era3Visible = false;
    } else {
      this.era3Visible = true;
    }
    if (this.era4 === '') {
      this.era4Visible = false;
    } else {
      this.era4Visible = true;
    }

  }

  galderakarray: Galdera[] = [{
    galdera: "Zer ateratzen zuten meatzariek?",
    erantzuna: "Lokatza",
    erantzuna2: "Burdinezko harriak",
    erantzuna3: "Urrezko harriak",
    erantzuna4: "Zilarra",
    erantzunz: '2'
  },
    {
      galdera: "Burdina zilarra edo urrea bezain baliotsua zen?",
      erantzuna: "Ez",
      erantzuna2: "Bai",
      erantzuna3: "",
      erantzuna4: "",
      erantzunz: '1'
    }, {
      galdera: "Gaur egungo Gallarta aintzinakoa bezalakoa da?",
      erantzuna: "Bai",
      erantzuna2: "Ez",
      erantzuna3: "",
      erantzuna4: "",
      erantzunz: '2'
    },
    {
      galdera: "Nola deitzen zaio meategi asko dauden tokiari?",
      erantzuna: "Meatzaldea",
      erantzuna2: "Meatzaritza",
      erantzuna3: "Meatzartea",
      erantzuna4: "Meategia",
      erantzunz: '1'
    },
    {
      galdera: "Zergatik berriro eraiki zuten Gallarta?",
      erantzuna: "Oso itsusia zelako",
      erantzuna2: "Egoera txarrean zegoelako",
      erantzuna3: "Gallartan burdin asko zegoela ohartu zirelako",
      erantzuna4: "Jende bizi zelako",
      erantzunz: '3'
    }
  ];

  hurrengoGaldera() {
    this.indexGalderak = this.indexGalderak + 1;
    if (this.indexGalderak < this.galderakarray.length) {
      if (this.galderakarray[this.indexGalderak].erantzuna3 === '') {
        this.era3Visible = false;
      } else {
        this.era3Visible = true;
      }
      if (this.galderakarray[this.indexGalderak].erantzuna4 === '') {
        this.era4Visible = false;
      } else {
        this.era4Visible = true;
      }

      this.gald = this.galderakarray[this.indexGalderak].galdera;
      this.era = this.galderakarray[this.indexGalderak].erantzuna;
      this.era2 = this.galderakarray[this.indexGalderak].erantzuna2;
      this.era3 = this.galderakarray[this.indexGalderak].erantzuna3;
      this.era4 = this.galderakarray[this.indexGalderak].erantzuna4;
      this.aukeratutakoerantzuna='0';
    }
    else{
      this.indexGalderak = this.indexGalderak - 1;

      this.abrirAlert();

      this.controller.dismiss();
    }
  }

  async  abrirAlert(){
    const alert =  await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Zorionak!',
      subHeader: 'Hurrengo lekura joan zaitezke.',
      message: ' ',
      buttons: ['OK']
    });

    await alert.present();
  }

  zuzendu(){
    if (this.aukeratutakoerantzuna===this.galderakarray[this.indexGalderak].erantzunz){
      this.colorVar1 = "white"
      this.colorVar2= "white"
      this.colorVar3 = "white"
      this.colorVar4 = "white"
      this.hurrengoGaldera()
    }else{
      switch (this.aukeratutakoerantzuna) {
        case "1":
          this.colorVar1 = "red"
          break;
        case "2":
          this.colorVar2 = "red"
          break;
        case "3":
          this.colorVar3 = "red"
          break;
        case "4":
          this.colorVar4 = "red"
          break;

      }
    }

  }
}
