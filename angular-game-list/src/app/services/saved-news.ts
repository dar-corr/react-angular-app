import { Injectable, afterNextRender, signal } from '@angular/core';
import { SavedNews, ReadingHistoryEntry } from '../models/saved-news';

@Injectable({
  providedIn: 'root',
})
export class SavedNewsService {
  private readonly savedKey = 'newsHubSaved';
  private readonly historyKey = 'newsHubHistory';

  private readonly savedState = signal<SavedNews[]>([]);
  private readonly historyState = signal<ReadingHistoryEntry[]>([]);

  private readonly readyState = signal(false);
  readonly ready = this.readyState.asReadonly();

  readonly savedNews = this.savedState.asReadonly();
  readonly history = this.historyState.asReadonly();

  constructor() {
    afterNextRender({
      read: () => {
        this.savedState.set(this.load<SavedNews>(this.savedKey));
        this.historyState.set(this.load<ReadingHistoryEntry>(this.historyKey));
        this.readyState.set(true);
      },
    });
  }

  // получить одну сохранённую новость
  getById(id: number): SavedNews | undefined {
    return this.savedState().find((news) => news.id === id);
  }

  // добавить новость
  addNews(id: number, title: string): boolean {
    title = title.trim();

    if (!Number.isSafeInteger(id) || id <= 0 || !title) {
      return false;
    }

    if (this.getById(id)) {
      return false;
    }

    const news: SavedNews = {
      id,
      title,
      savedAt: new Date().toISOString(),
      readAt: null,
    };

    this.savedState.update((items) => [news, ...items]);
    this.persist();

    return true;
  }

  // удалить из сохранённых
  removeNews(id: number): void {
    this.savedState.update((items) => items.filter((news) => news.id !== id));

    this.persist();
  }

  // отметить как прочитанную
  markAsRead(id: number): boolean {
    const news = this.getById(id);

    if (!news || news.readAt) return false;

    const readAt = new Date().toISOString();

    this.savedState.update((items) =>
      items.map((item) => (item.id === id ? { ...item, readAt } : item)),
    );

    this.historyState.update((items) => [
      {
        newsId: id,
        title: news.title,
        readAt,
      },
      ...items,
    ]);

    this.persist();

    return true;
  }

  // восстановить данные из localStorage
  private load<T>(key: string): T[] {
    try {
      const raw = localStorage.getItem(key);
      const data: unknown = JSON.parse(raw ?? '[]');

      return Array.isArray(data) ? (data as T[]) : [];
    } catch {
      return [];
    }
  }

  // сохранить изменения
  private persist(): void {
    try {
      localStorage.setItem(this.savedKey, JSON.stringify(this.savedState()));

      localStorage.setItem(this.historyKey, JSON.stringify(this.historyState()));
    } catch (error) {
      console.error('Ошибка сохранения данных:', error);
    }
  }
}
