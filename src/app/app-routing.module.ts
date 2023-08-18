import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesBoardComponent } from "./components/articles-board/articles-board.component";
import { ArticleDetailsComponent } from "./components/article-details/article-details.component";

const routes: Routes = [
  { path: '', component: ArticlesBoardComponent},
  { path: 'article/:articleID', component: ArticleDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
