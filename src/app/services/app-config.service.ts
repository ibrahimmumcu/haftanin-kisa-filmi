import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  movies = [];

  constructor(private http: HttpClient) {

  }

  loadConfigFile() {
    const jsonFile = `https://www.filmloverss.com/kisa/kisa.json`;
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((data: any) => {
        this.movies = data;
        resolve(data);
      }).catch((response: any) => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }
}
