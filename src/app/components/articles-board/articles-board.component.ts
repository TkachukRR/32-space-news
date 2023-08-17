import { Component, inject, OnInit } from '@angular/core';
import { Article, ArticlesService } from "../../services/articles.service";

@Component({
  selector: 'app-articles-board',
  templateUrl: './articles-board.component.html',
  styleUrls: ['./articles-board.component.scss']
})
export class ArticlesBoardComponent implements OnInit{
  private _as = inject(ArticlesService);
  public results$ = 0
  public isLoadingData$ = false;
  public articles: Article[] = [];

  public ngOnInit(): void {
    this._as.isLoading$.subscribe( isLoading => this.isLoadingData$ = isLoading)
    this._as.resultsQuantity$.subscribe( results => this.results$ = results)
    this._as.articles$.subscribe(articles => this.articles = articles)
    this._as.getArticles()
  }
}
