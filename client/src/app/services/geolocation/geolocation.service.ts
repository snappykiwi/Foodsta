import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class GeolocationService {

  private url: string = '/api/google/place/user/geolocation';

  public latitudeSource = new BehaviorSubject({});
  public latitude = this.latitudeSource.asObservable();

  public longitudeSource = new BehaviorSubject({});
  public longitude = this.longitudeSource.asObservable();

  public gotLocation = new BehaviorSubject(false)

  constructor(private http: HttpClient) { }

  getGeolocation() {

    return this.http.post(`${this.url}`, "");

  };

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        this.gotLocation.next(true);

        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });

  }


}
