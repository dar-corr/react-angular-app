import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="welcome">
      <h2>Добро пожаловать!</h2>

      <p>Это учебное Angular-приложение с каталогом игр.</p>

      <a routerLink="/games"> Перейти в каталог </a>
    </section>
  `,
})
export class HomePage {}
