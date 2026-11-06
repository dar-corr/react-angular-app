import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SavedNews } from '../models/saved-news';

@Component({
  selector: 'app-saved-news-card',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './saved-news-card.html',
  styleUrl: './saved-news-card.css'
})
export class SavedNewsCard {
  // получаем новость от родителя
  readonly news = input.required<SavedNews>();

  // передаём события родителю
  readonly markRead = output<number>();
  readonly remove = output<number>();

  onMarkRead(): void {
    this.markRead.emit(this.news().id);
  }

  onRemove(): void {
    this.remove.emit(this.news().id);
  }
}
