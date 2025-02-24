import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly apiURL = '/api';  // Usa proxy para evitar CORS
  readonly apiKey = 'd310d478d065edc05a29f9c5aa7fbb5a7eeb5569';

  comics: any[] = [];

  constructor(private http: HttpClient) {}

  getComics(): Observable<any> {
    const headers = new HttpHeaders({
      'User-Agent': 'MiAppAngular/1.0' 
    });

    return this.http.get<any>(`${this.apiURL}/issues/?api_key=${this.apiKey}&format=json&limit=9`, { headers });
  }

  getComicsByTitle(title: string): Observable<any> {
    const headers = new HttpHeaders({
      'User-Agent': 'MiAppAngular/1.0' 
    });

    return this.http.get<any>(`${this.apiURL}/volumes/?api_key=${this.apiKey}&format=json&filter=name:${title}&limit=9`, { headers });
  }

  getComicById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'User-Agent': 'MiAppAngular/1.0' 
    });
  
    return this.http.get<any>(`${this.apiURL}/issue/4000-${id}/?api_key=${this.apiKey}&format=json`, { headers });
  }
  
}