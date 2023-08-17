import { Component, Input } from '@angular/core';
import { Article } from "../../services/articles.service";

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() articleData!: Article;
  @Input() searchWords: string[] = [];
}
