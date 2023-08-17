import { Component, inject, OnInit } from '@angular/core';
import { Article, ArticlesService, SearchParams } from "../../services/articles.service";
import { FormBuilder, FormGroup } from "@angular/forms";

const ARTICLES_LIMIT = 9
const ARTICLES_OFFSET = 9

@Component({
  selector: 'app-articles-board',
  templateUrl: './articles-board.component.html',
  styleUrls: ['./articles-board.component.scss']
})
export class ArticlesBoardComponent implements OnInit{
  private _as = inject(ArticlesService);
  private _formBuilder = inject(FormBuilder);

  public results$ = 0
  public isLoadingData$ = false;
  public articles: Article[] = [];

  public searchingForm: FormGroup = this._formBuilder.nonNullable.group({
      searchValue: this._formBuilder.nonNullable.control<string>('', ),
    }
  )

  public ngOnInit(): void {
    this._as.isLoading$.subscribe( isLoading => this.isLoadingData$ = isLoading)
    this._as.resultsQuantity$.subscribe( results => this.results$ = results)
    this._as.articles$.subscribe(articles => this.articles = articles)
    this._as.getArticles()
  }

  public onSubmit(): void{
    const inputValue = this.searchingForm.get('searchValue')?.value.replace(/\s+/g, ' ').trim().replace(' ', '%2C')
    const search: SearchParams = {
      limit: ARTICLES_LIMIT,
      offset: ARTICLES_OFFSET,
      value: inputValue
    }

    this._as.getArticles(search)
  }
}
