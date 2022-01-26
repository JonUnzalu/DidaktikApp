import { Component, OnInit } from '@angular/core';
import {DOCUMENT} from "@angular/common";


interface Galdera {
  galdera: string;
  desordenatuta: string;
  argazkia: string;
  erantzuna: string;
  erantzunz: string;
}

@Component({
  selector: 'app-letraordenatu',
  templateUrl: './letraordenatu.page.html',
  styleUrls: ['./letraordenatu.page.scss'],
})
export class LetraordenatuPage implements OnInit {
  public gald: string;
  public argaz: string;
  public desorden: string;

  public indexGalderak: number;
  // public desor: string;
  // public arga: string;
  // public era: string;
  // public eraz: string;

  constructor() { }

  ngOnInit() {
    this.gald = this.galderakarray[0].galdera;
    this.argaz = this.galderakarray[0].argazkia;
    this.desorden = this.galderakarray[0].desordenatuta;
    this.indexGalderak = 0;
    this.BotonesDesordenados();
  }
  galderakarray: Galdera[] = [{
    galdera: "Nola deitzen da estatuan agertzen den emakumea?",
    desordenatuta: "SORDELO",
    argazkia: "../../assets/img/dolores.jpg",
    erantzuna: "DOLORES",
    erantzunz: '3'
  },
    {
      galdera: "Nola deitzen zioten doloresi?",
      desordenatuta: "NOSIALAARPIA",
      argazkia: "../../assets/img/meatzariak.jpg",
      erantzuna: "LAPASIONARIA",
      erantzunz: '3'
    }, {
      galdera: "Zenbat ordu lan egiten zuten meatzariak?",
      desordenatuta: "ABMAHI",
      argazkia: "../../assets/img/meatzariak.jpg",
      erantzuna: "HAMABI",
      erantzunz: '3'
    }
  ];

  BotonesDesordenados(){
    for (let i = 0; i < this.galderakarray[this.indexGalderak].desordenatuta.length; i++) {
      document.getElementById("buttons").innerHTML += "<ion-button style='margin-left: auto; margin-right: auto; display: block; width: 20px; height: 20px'>"+this.galderakarray[this.indexGalderak].desordenatuta.charAt(i)+"</ion-button>";
    }
  }
  BorrarBotones(){
    document.getElementById("buttons").innerHTML= "";
  }

  hurrengoHitza(){
    this.indexGalderak = this.indexGalderak + 1;
    this.gald = this.galderakarray[this.indexGalderak].galdera;
    this.argaz = this.galderakarray[this.indexGalderak].argazkia;
    if (this.indexGalderak < this.galderakarray.length) {
      this.BorrarBotones();
      this.BotonesDesordenados();
    }else {
      alert("Hemos llegado al final");
    }
    // this.indexGalderak = this.indexGalderak + 1;
    // this.BotonesDesordenados();

  }

  // hurrengoGaldera() {
  //   this.indexGalderak = this.indexGalderak + 1;
  //   if (this.indexGalderak < this.galderakarray.length) {
  //     if (this.galderakarray[this.indexGalderak].erantzuna3 === '') {
  //       this.era3Visible = false;
  //     } else {
  //       this.era3Visible = true;
  //     }
  //     if (this.galderakarray[this.indexGalderak].erantzuna4 === '') {
  //       this.era4Visible = false;
  //     } else {
  //       this.era4Visible = true;
  //     }
  //
  //     this.gald = this.galderakarray[this.indexGalderak].galdera;
  //     this.era = this.galderakarray[this.indexGalderak].erantzuna;
  //     this.era2 = this.galderakarray[this.indexGalderak].erantzuna2;
  //     this.era3 = this.galderakarray[this.indexGalderak].erantzuna3;
  //     this.era4 = this.galderakarray[this.indexGalderak].erantzuna4;
  //     this.aukeratutakoerantzuna='0';
  //   }
  //   else{
  //     this.indexGalderak = this.indexGalderak - 1;
  //
  //     this.abrirAlert();
  //
  //     this.controller.dismiss();
  //   }
  // }
}
