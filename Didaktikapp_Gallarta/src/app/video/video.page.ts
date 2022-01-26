import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  isVideoHidden: boolean;
  isButtonHidden: boolean;

  @Input() video: string;
  @Input() ekintza: string;
  @Input() controller: PopoverController;

  constructor() { }

  ngOnInit() {
    this.isVideoHidden = false
    this.isButtonHidden = true
  }

  closeVideo(){
    this.controller.dismiss();
  }

  vidEnded(){
    if(this.ekintza==="Itxi"){
      this.controller.dismiss();
    }
    else{
      this.isVideoHidden = true
      this.isButtonHidden = false
    }
  }

}
