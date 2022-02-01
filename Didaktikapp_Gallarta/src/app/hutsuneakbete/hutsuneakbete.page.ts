import {Component, Input, OnInit} from '@angular/core';
import { PopoverController } from '@ionic/angular';


interface Erantzunak {
  erantzuna: string;
}

interface InputState{
  indexGalderak: number;
  textuaDauka: boolean;
}

@Component({
  selector: 'app-hutsuneakbete',
  templateUrl: './hutsuneakbete.page.html',
  styleUrls: ['./hutsuneakbete.page.scss'],
})
export class HutsuneakbetePage implements OnInit {

  botoiak: any;
  inputs: any;
  indexInputs: any;
  indexBtn: any;
  @Input() controller: PopoverController;

  constructor(public popoverController: PopoverController) {
  }

  ngOnInit() {
    this.botoiak = document.getElementsByClassName('btn');
    this.inputs = document.getElementsByClassName('inputs');
    this.indexInputs = 0;
    this.indexBtn = 0;
  }

  inputstateak: InputState[] = [{
    indexGalderak: 0,
    textuaDauka: false
  },{
    indexGalderak: 1,
    textuaDauka: false
  },{
    indexGalderak: 2,
    textuaDauka: false
  },{
    indexGalderak: 3,
    textuaDauka: false
  },{
    indexGalderak: 4,
    textuaDauka: false
  }];

// Triano burdina utzi desagertu eskola

  erantzunakarray: Erantzunak[] = [{
    erantzuna: 'Triano'
  },
    {
      erantzuna: 'burdina'
    }, {
      erantzuna: 'utzi'
    }, {
      erantzuna: 'desagertu'
    }, {
      erantzuna: 'eskola'
    }
  ];

  sartu(num) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i=0; i< this.inputs.length;i++){
      if(!this.inputstateak[i].textuaDauka){
          this.inputstateak[i].textuaDauka = true;
          document.getElementById(num.toString()).hidden = true;
          this.inputs[i].value = this.botoiak[num].innerHTML;
          break;
      }
    }
  }

  kendu(letra) {
    for (let i = 0; i < this.inputs.length; i++) {
      if (this.inputs[i].id.toString() === letra.toString()) {
        const inputValue = this.inputs[i].value;

        this.inputs[i].value = '';
        this.inputstateak[i].textuaDauka = false;

        for(let q=0;q<this.inputs.length;q++) {
          if(document.getElementById(q.toString()).innerHTML.toString() === inputValue){
            document.getElementById(q.toString()).hidden = false;
          }
        }
      }

    }
  }

  zuzendu(){
    let todasBien = true;

    for (let i = 0; i < this.inputs.length; i++) {
      if(this.inputs[i].value === ''){
        document.getElementById('i' + i.toString()).style.background = "#eb0909"
        todasBien = false;
      }
      else if(this.inputs[i].value === this.erantzunakarray[i].erantzuna){
        document.getElementById('i' + i.toString()).style.background = "#03ff24"
      }
      else{
        document.getElementById('i' + i.toString()).style.background = "#eb0909"
        todasBien = false;
      }
    }

    if(todasBien){
      this.controller.dismiss()
    }

  }


}
