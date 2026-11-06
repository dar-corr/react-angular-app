import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { SavedNewsService } from '../../services/saved-news';

@Component({
  selector: 'app-saved-detail-page',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './saved-detail-page.html',
  styleUrl: './saved-detail-page.css',
})
export class SavedDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly newsService = inject(SavedNewsService);

  readonly ready = this.newsService.ready;

  private readonly params = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  readonly newsId = computed(() => {
    const rawId = this.params().get('id');

    if (!rawId || !/^[1-9]\d*$/.test(rawId)) {
      return null;
    }

    const id = Number(rawId);
    return Number.isSafeInteger(id) ? id : null;
  });

  readonly currentNews = computed(() => {
    const id = this.newsId();

    return id === null ? undefined : this.newsService.getById(id);
  });

  markAsRead(): void {
    const id = this.newsId();

    if (id !== null) {
      this.newsService.markAsRead(id);
    }
  }

  removeNews(): void {
    const id = this.newsId();

    if (id === null) {
      return;
    }

    if (window.confirm('Удалить новость из сохранённых?')) {
      this.newsService.removeNews(id);
      void this.router.navigateByUrl('/saved');
    }
  }
}
