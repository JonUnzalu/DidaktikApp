import {Component, OnInit} from '@angular/core';


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

  constructor() {
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
    // if (this.botoiak[num].id.toString() === num.toString()) {
    //   this.inputstateak[num].textuaDauka = true;
    //   document.getElementById(num.toString()).hidden = true;
    //   this.inputs[this.indexBtn].value = this.botoiak[num].innerHTML;
    //   this.indexBtn += 1;
    // }
  }

  kendu(letra) {
    // console.log(document.getElementById(letra). + ' a')
    // if(document.getElementById(letra).textContent !== ''){
    // }
    // this.inputs[0].value = 'a'

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

    // for (let i = 0; i < this.inputs.length; i++) {
    //     if (this.inputs[i].id.toString() === letra.toString()) {
    //       if(this.inputstateak[i].textuaDauka) {
    //         this.inputstateak[i].textuaDauka = false;
    //
    //         let hiddenId;
    //         for(let q=0;q<this.inputs.length;q++){
    //           console.log(document.getElementById('i' + q.toString()).textContent)  //Este sería el resul
    //           console.log(this.inputs[i].value)     //Este es lo que tenemos en el input
    //           console.log("---------------------")
    //
    //           if(this.inputs[i].value === document.getElementById('i' + q.toString()).textContent){
    //             hiddenId = q;
    //             break;
    //           }
    //         }
    //
    //         document.getElementById(hiddenId.toString()).hidden = false;
    //         this.inputs[i].value = '';
    //       }
    //   }
    // }



}
