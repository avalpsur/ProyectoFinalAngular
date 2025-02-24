import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  imports: [RouterLink],
  styleUrls: ['./comics.component.css'],
  standalone: true
})
export class ComicsComponent implements OnInit {
  comics: any[] = [];

  @ViewChild('filtrar', { static: true }) filtrar!: ElementRef;

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.getComics();
  }

  getComics() {
    this.apiService.getComics().subscribe({
      next: (data: any) => {
        if (data?.results?.length) {
          this.comics = data.results;
        } else {
          console.warn('No se encontraron cómics.');
          this.comics = [];
        }
      },
      error: (e) => {
        console.error('Error al obtener los cómics:', e);
        this.comics = [];
      }
    });
  }

  buscarComics(event: Event) {
    event.preventDefault(); 
    const valor = this.filtrar.nativeElement.value;
    this.filtrarComics(valor);
  }

  filtrarComics(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    if (valor.length > 2) {
      this.apiService.getComicsByTitle(valor).subscribe({
        next: (data: any) => {
          if (data?.results?.length) {
            this.comics = data.results;
          } else {
            console.warn('No se encontraron cómics.');
            this.comics = [];
          }
        },
        error: (e) => {
          console.error('Error al obtener los cómics:', e);
          this.comics = [];
        }
      });
    } else {
      this.getComics();
    }
  }

  addFavorito(id: number) {
    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    if (!favoritos.includes(id)) {
      favoritos.push(id);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      console.log(`Cómic con ID ${id} añadido a favoritos.`);
    } else {
      console.log(`Cómic con ID ${id} ya está en favoritos.`);
    }
  }

  verComic(comic: any) {
    console.log('Ver comic:', comic);
  }
}
