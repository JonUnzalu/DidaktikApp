import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  erabiltzailea = '';

  constructor(private route: Router) { }

  ngOnInit() {
    if(localStorage.getItem('erabiltzailea')!=null){
      this.route.navigate(['/folder/Hasiera']);
    }
  }

  hasiSaioa(){
    if(this.erabiltzailea===''){
      alert("Erabiltzailea sartu behar duzu!");
    }else{
      localStorage.setItem('erabiltzailea', this.erabiltzailea);
      this.route.navigate(['/folder/Hasiera']);
    }
  }

}
