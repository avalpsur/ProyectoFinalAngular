import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.css'],
  standalone: true
})
export class ComicDetailComponent implements OnInit {
  comicDetails: any = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const comicId = Number(this.route.snapshot.params['id']);
    console.log('ID del cómic:', comicId);

    this.apiService.getComicById(comicId).subscribe({
      next: (data: any) => {
        this.comicDetails = data.results;
        console.log('Detalles del cómic:', this.comicDetails);
      },
      error: (e) => {
        console.error('Error al obtener detalles del cómic:', e);
      }
    });
  }
}
