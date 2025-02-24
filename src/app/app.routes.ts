import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComicsComponent } from './comics/comics.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { FavoritosComponent } from './favoritos/favoritos.component';

const isAuthenticated = () => inject(AuthService).isAuthenticated();


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    { path: 'buscador', component: ComicsComponent },
    {path: 'comics', component: ComicsComponent},
    { path: 'detalle/:id', component: ComicDetailComponent },
    { path: 'contacto', component: ContactComponent },
    { path: 'login', component: LoginComponent },
  { 
    path: 'favoritos', 
    component: FavoritosComponent,
    canActivate: [() => isAuthenticated() || (window.location.href = '/login')]
  },
    {path: '**', redirectTo: 'home'}
];
