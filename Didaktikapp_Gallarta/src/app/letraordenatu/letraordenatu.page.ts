import { Component, Input, OnInit } from '@angular/core';
import {DOCUMENT} from "@angular/common";
import { PopoverController } from '@ionic/angular';


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

  @Input() controller: PopoverController;

  public indexGalderak: number;
  public indexErantzuna: number;

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
    this.gald = this.galderakarray[0].galdera;
    this.argaz = this.galderakarray[0].argazkia;
    this.desorden = this.galderakarray[0].desordenatuta;
    this.indexGalderak = 0;
    this.indexErantzuna = 0;
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
      desordenatuta: "NOSIALAA RPIA",
      argazkia: "../../assets/img/meatzariak.jpg",
      erantzuna: "LA PASIONARIA",
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
      document.getElementById("buttons").innerHTML += "<ion-button id='" + i + "' style='margin-left: auto; margin-right: auto; display: block; width: 20px; height: 20px'>"+this.galderakarray[this.indexGalderak].desordenatuta.charAt(i)+"</ion-button>";
    }
    for (let i = 0; i < this.galderakarray[this.indexGalderak].desordenatuta.length; i++) {
      document.getElementById(i.toString()).addEventListener("click", () => {
        this.addBoton(this.galderakarray[this.indexGalderak].desordenatuta.charAt(i), i);
        document.getElementById(i.toString()).hidden = true;
      });
    }

  }

  BorrarBotones(){
    document.getElementById("buttons").innerHTML= "";
    document.getElementById("buttonsOrdenados").innerHTML= "";
  }

  addBoton(letra, indexBoton){
    let buttonId = "e" + this.indexErantzuna.toString();

    // eslint-disable-next-line max-len
    document.getElementById("buttonsOrdenados").innerHTML+= "<ion-button indexPadre='"+indexBoton+"' class='botonErantzuna' id='" + buttonId + "' color='primary' style='margin-left: auto; margin-right: auto; display: block; width: 20px; height: 20px'>" + letra + "</ion-button>";

    let botoiKopurua = document.getElementsByClassName('botonErantzuna');

    for(let i=0;i<botoiKopurua.length;i++){
      let idBoton = botoiKopurua[i].id;
      let idPadre = botoiKopurua[i].getAttribute("indexPadre").toString();

      document.getElementById(idBoton).addEventListener("click", () => {
        document.getElementById(idPadre).hidden = false;
        document.getElementById(idBoton).remove();

        this.indexErantzuna = this.indexErantzuna - 1;
      });
    }

    this.indexErantzuna = this.indexErantzuna + 1;
  }

  hurrengoHitza(){
    const erantzunZuzena = this.galderakarray[this.indexGalderak].erantzuna;
    let erabiltzaileErantzuna = "";

    for (let i = 0; i < this.indexErantzuna; i++){
      erabiltzaileErantzuna += document.getElementById('e' + i).innerHTML.toString();
    }

    console.log(erantzunZuzena + ", " + erabiltzaileErantzuna)

    if(erantzunZuzena === erabiltzaileErantzuna){
      this.indexGalderak = this.indexGalderak + 1;

      if (this.indexGalderak < this.galderakarray.length) {
        this.gald = this.galderakarray[this.indexGalderak].galdera;
        this.argaz = this.galderakarray[this.indexGalderak].argazkia;

        this.BorrarBotones();
        this.indexErantzuna = 0;
        this.BotonesDesordenados();
      }else {
        this.controller.dismiss()
      }
    }
    else{
      for(let i = 0;i<erabiltzaileErantzuna.length;i++){
        if(erabiltzaileErantzuna.charAt(i) !== erantzunZuzena.charAt(i)){
          document.getElementById('e' + i).setAttribute("color", "danger");
        }
      }
    }
  }

}
