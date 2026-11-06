import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SavedNewsService } from '../../services/saved-news';
import { RouterLink } from '@angular/router';
import { SavedNewsCard } from '../../components/saved-news-card';

type ReadFilter = 'all' | 'read' | 'unread';

@Component({
  selector: 'app-saved-page',
  standalone: true,
  imports: [RouterLink, SavedNewsCard],
  templateUrl: './saved-page.html',
  styleUrl: './saved-page.css'
})
export class SavedPage {
  private readonly newsService = inject(SavedNewsService);

  readonly savedNews = this.newsService.savedNews;
  readonly filter = signal<ReadFilter>('all');

  readonly readCount = computed(
    () => this.savedNews().filter((news) => news.readAt !== null).length,
  );

  readonly filteredNews = computed(() => {
    const news = this.savedNews();

    switch (this.filter()) {
      case 'read':
        return news.filter((item) => item.readAt !== null);

      case 'unread':
        return news.filter((item) => item.readAt === null);

      default:
        return news;
    }
  });

  setFilter(value: ReadFilter): void {
    this.filter.set(value);
  }

  markAsRead(id: number): void {
    this.newsService.markAsRead(id);
  }

  removeNews(id: number): void {
    if (window.confirm('Удалить новость из сохранённых?')) {
      this.newsService.removeNews(id);
    }
  }
}
