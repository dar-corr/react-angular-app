import { ChangeDetectorRef, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Game, GameService } from '../../services/game';

@Component({
  selector: 'app-games-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './games-page.html',
  styleUrl: './games-page.css',
})
export class GamesPage implements OnInit {
  games: Game[] = [];

  loading = false;
  error = '';

  private readonly platformId = inject(PLATFORM_ID);

  constructor(
    private gameService: GameService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loadGames();
  }

  loadGames(): void {
    this.loading = true;
    this.error = '';

    this.gameService.getGames().subscribe({
      next: (games) => {
        console.log('Игры получены:', games);

        this.games = games;
        this.loading = false;

        this.cdr.markForCheck();
      },

      error: (err) => {
        console.error('Ошибка загрузки игр:', err);

        this.error = 'Не удалось загрузить игры';
        this.loading = false;

        this.cdr.markForCheck();
      },
    });
  }
}
