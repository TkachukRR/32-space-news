import { Component, inject, Input, OnInit } from '@angular/core';
import { Article, ArticlesService } from "../../services/articles.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit{
  private _as = inject(ArticlesService);
  private _route = inject(ActivatedRoute);
  @Input() articleId: number = Number(this._route.snapshot.paramMap.get('articleID'));
  public article: Article = {} as Article
  public isLoading = true

  public ngOnInit(): void {
    this._as.gedArticleByID(this.articleId).subscribe(
      (article: Article) => {
        this.article = article;
        this.isLoading = false;
      }
    )
  }
}
