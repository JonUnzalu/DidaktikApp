import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LokalizazioakService {

  constructor(public http: HttpClient) {
  }

  lokalizazioak() {
    return new Promise(resolve => {
      this.http.get('http://127.0.0.1:8000/api/lokalizazioa').subscribe(data => {
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  }
}
