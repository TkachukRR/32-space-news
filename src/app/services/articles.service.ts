import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

const API = {
  protocol: 'https',
  url: 'api.spaceflightnewsapi.net',
  version: 'v4',
  service: 'articles'
}

const API_PARAMS = {
  limit: 'limit=',
  offset: 'offset=',
  oneOfSummary: 'summary_contains_one=',
  oneOfTitle: 'title_contains_one='
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
  published_at: string;
}

export interface SearchParams {
  offset: number;
  limit: number;
  value: string;
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

  public getArticles(search: SearchParams | '' = '' ): void {
    let searchString = ''
    if (search) searchString = this._getSearchString(search)
    this._isLoadingSubject.next(true);
    this._http.get<ApiResponse>(this._articlesUrl + searchString).subscribe(
        (resp: ApiResponse) => {
          this._resultsQuantitySubject.next(resp.count);
          this._articlesSubject.next(resp.results);
          this._isLoadingSubject.next(false);
        }
      )
  }

  public gedArticleByID(id: number): Observable<Article>{
    return this._http.get<Article>(this._articlesUrl + id + '/');
  }

  private _getSearchString(search: SearchParams): string{
    return (
      '?' + API_PARAMS.limit + search.limit +
      '&' + API_PARAMS.offset + search.offset +
      '&' + API_PARAMS.oneOfTitle + search.value +
      '&' + API_PARAMS.oneOfSummary + search.value)
  }
}
