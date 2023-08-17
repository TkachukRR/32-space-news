import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable, pipe, tap } from "rxjs";

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
  private _articlesUrl: string =`${API.protocol}://${API.url}/${API.version}/${API.service}/`;

  private _isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this._isLoadingSubject.asObservable();

  private _resultsQuantitySubject = new BehaviorSubject<number>(0);
  public resultsQuantity$ = this._resultsQuantitySubject.asObservable();

  private _articlesSubject = new BehaviorSubject<Article[]>([]);
  public articles$ = this._articlesSubject.asObservable();

  public getArticles(): void {
    this._isLoadingSubject.next(true);
    this._http.get<ApiResponse>(this._articlesUrl).subscribe(
        (resp: ApiResponse) => {
          this._resultsQuantitySubject.next(resp.count);
          this._articlesSubject.next(resp.results);
          this._isLoadingSubject.next(false);
        }
      )
  }
}
