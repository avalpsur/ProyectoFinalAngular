import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
  standalone: true
})
export class FavoritosComponent implements OnInit {
  favoritos: any[] = [];
  idsFavoritos: number[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    const ids = JSON.parse(localStorage.getItem('favoritos') || '[]');
    this.idsFavoritos = ids;
  
    this.favoritos = []; 
  
    this.idsFavoritos.forEach(id => {
      this.apiService.getComicById(id).subscribe({
        next: (data: any) => {
          if (data.results) {
            this.favoritos.push(data.results);
          }
        },
        error: (e: any) => { 
          console.error(`Error al obtener el cómic con ID ${id}:`, e);
        }
      });
    });
  }
  

  addFavorito(id: number) {
    if (!this.idsFavoritos.includes(id)) {
      this.idsFavoritos.push(id);
      localStorage.setItem('favoritos', JSON.stringify(this.idsFavoritos));
      this.cargarFavoritos(); 
    }
  }

  removeFavorito(id: number) {
    this.idsFavoritos = this.idsFavoritos.filter(favId => favId !== id);
    localStorage.setItem('favoritos', JSON.stringify(this.idsFavoritos));
    this.cargarFavoritos(); 
  }
}
