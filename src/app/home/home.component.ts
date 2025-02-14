import { Component } from '@angular/core';
import { Noticia } from './noticia'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  noticias: Noticia[] = [
    { id: 1, titulo: "Noticia 1", descripcion: "Descripcion de la noticia 1", fecha: "2021-10-10" },
    { id: 2, titulo: "Noticia 2", descripcion: "Descripcion de la noticia 2", fecha: "2021-10-10" },
  ];
}