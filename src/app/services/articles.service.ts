import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable, tap } from "rxjs";

const API = {
  protocol: 'https',
  url: 'api.spaceflightnewsapi.net',
  version: 'v4',
  service: 'articles'
}

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
}

export interface Article{
  id: number;
  image_url: string;
  title: string;
  summary: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private _http = inject(HttpClient);
  private _articlesUrl =`${API.protocol}://${API.url}/${API.version}/${API.service}/`

  public getArticles(): Observable<Article[]> {
    return this._http.get<ApiResponse>(this._articlesUrl)
      .pipe(
        map((resp: ApiResponse) => resp.results)
      )
  }
}
