import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';

export interface Game {
  id: number;
  title: string;
  genre: string;
  platform: string;
  publisher: string;
  image: string;
}

export interface GameDetail {
  id: number;
  title: string;
  description: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  releaseDate: string;
  image: string;
}

interface ApiGame {
  id: number;
  title: string;
  thumbnail: string;
  genre: string;
  platform: string;
  publisher: string;
}

interface ApiGameDetail {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly apiUrl = 'https://www.freetogame.com/api';

  private gamesCache?: Observable<Game[]>;

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    if (!this.gamesCache) {
      this.gamesCache = this.http.get<ApiGame[]>(`${this.apiUrl}/games?sort-by=popularity`).pipe(
        map((games) =>
          games.slice(0, 9).map((game) => ({
            id: game.id,
            title: game.title,
            genre: game.genre,
            platform: game.platform,
            publisher: game.publisher,
            image: game.thumbnail,
          })),
        ),

        shareReplay(1),
      );
    }

    return this.gamesCache;
  }

  getGame(id: number): Observable<GameDetail> {
    return this.http.get<ApiGameDetail>(`${this.apiUrl}/game?id=${id}`).pipe(
      map((game) => ({
        id: game.id,
        title: game.title,
        description: game.description,
        genre: game.genre,
        platform: game.platform,
        publisher: game.publisher,
        developer: game.developer,
        releaseDate: game.release_date,
        image: game.thumbnail,
      })),
    );
  }
}
