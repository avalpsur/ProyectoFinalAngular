import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  // Método para Iniciar Sesión
  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('token', 'logged-in');
      this.router.navigate(['/favoritos']);
      return true;
    }
    return false;
  }

  // ✅ Método para Cerrar Sesión
  logout() {
    localStorage.removeItem('token');  // ✅ Elimina el token de localStorage
    this.router.navigate(['/login']);  // ✅ Redirige al login
  }

  // Método para Comprobar si el Usuario está Autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem('token') === 'logged-in';
  }





  getFavoritos(): string[] {
    return JSON.parse(localStorage.getItem('favoritos') || '[]');
  }

  addFavorito(elemento: string) {
    const favoritos = this.getFavoritos();
    if (!favoritos.includes(elemento)) {
      favoritos.push(elemento);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }
  }

  removeFavorito(elemento: string) {
    const favoritos = this.getFavoritos().filter(fav => fav !== elemento);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }
}
