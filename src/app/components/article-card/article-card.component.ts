import { Component, inject, Input } from '@angular/core';
import { Article } from "../../services/articles.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  private _router = inject(Router)

  @Input() articleData!: Article;
  @Input() searchWords: string[] = [];

  public showArticleDetail(id: number): void{
    this._router.navigate(['article/', id]);
  }
}
