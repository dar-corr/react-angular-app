import { ChangeDetectorRef, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { GameDetail, GameService } from '../../services/game';

@Component({
  selector: 'app-game-detail-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-detail-page.html',
  styleUrl: './game-detail-page.css',
})
export class GameDetailPage implements OnInit {
  gameId = 0;

  game: GameDetail | null = null;

  loading = false;
  error = '';

  private readonly platformId = inject(PLATFORM_ID);

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');

    this.gameId = Number(id);

    if (!Number.isFinite(this.gameId) || this.gameId <= 0) {
      this.error = 'Некорректный ID игры';
      return;
    }

    this.loadGame(this.gameId);
  }

  loadGame(id: number): void {
    this.loading = true;
    this.error = '';

    this.gameService.getGame(id).subscribe({
      next: (game) => {
        console.log('Получена игра:', game);

        this.game = game;
        this.loading = false;

        this.cdr.markForCheck();
      },

      error: (err) => {
        console.error('Ошибка загрузки игры:', err);

        this.error = 'Не удалось загрузить игру';

        this.loading = false;

        this.cdr.markForCheck();
      },
    });
  }
}
