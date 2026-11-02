import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { GamesPage } from './pages/games-page/games-page';
import { GameDetailPage } from './pages/game-detail-page/game-detail-page';
import { AboutPage } from './pages/about-page/about-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },

  {
    path: 'games',
    component: GamesPage,
  },

  {
    path: 'games/:id',
    component: GameDetailPage,
  },

  {
    path: 'about',
    component: AboutPage,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
