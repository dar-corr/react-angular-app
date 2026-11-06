import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { SavedNewsService } from '../../services/saved-news';

type HistoryOrder = 'newest' | 'oldest';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './history-page.html',
  styleUrl: './history-page.css',
})
export class HistoryPage {
  private readonly newsService = inject(SavedNewsService);

  readonly ready = this.newsService.ready;
  readonly history = this.newsService.history;

  // порядок сортировки
  readonly order = signal<HistoryOrder>('newest');

  readonly sortedHistory = computed(() => {
    const items = [...this.history()];

    return items.sort((a, b) => {
      const difference = a.readAt.localeCompare(b.readAt);

      return this.order() === 'newest' ? -difference : difference;
    });
  });

  // общее кол-во записей
  readonly totalCount = computed(() => this.history().length);

  // кол-во уникальных прочитанных новостей
  readonly uniqueCount = computed(() => new Set(this.history().map((item) => item.newsId)).size);

  setOrder(value: HistoryOrder): void {
    this.order.set(value);
  }

  // проверяем, осталась ли новость в сохранённых
  isSaved(id: number): boolean {
    return this.newsService.getById(id) !== undefined;
  }
}
