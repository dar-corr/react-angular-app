import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SavedNewsService } from '../../services/saved-news';

@Component({
  selector: 'app-saved-add-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './saved-add-page.html',
  styleUrl: './saved-add-page.css',
})
export class SavedAddPage {
  private readonly fb = inject(FormBuilder);
  private readonly newsService = inject(SavedNewsService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  errorMessage = '';

  readonly form = this.fb.nonNullable.group({
    id: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
  });

  constructor() {
    // позже React сможет передавать данные через URL
    const id = this.route.snapshot.queryParamMap.get('id');
    const title = this.route.snapshot.queryParamMap.get('title');

    this.form.patchValue({
      id: id ?? '',
      title: title ?? '',
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    this.errorMessage = '';

    if (this.form.invalid) {
      return;
    }

    const id = Number(this.form.controls.id.value);
    const title = this.form.controls.title.value.trim();

    if (!Number.isSafeInteger(id) || id <= 0) {
      this.errorMessage = 'Некорректный ID новости.';
      return;
    }

    const added = this.newsService.addNews(id, title);

    if (!added) {
      this.errorMessage = 'Эта новость уже сохранена.';
      return;
    }

    void this.router.navigateByUrl('/saved');
  }
}
