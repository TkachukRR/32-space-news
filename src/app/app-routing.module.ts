import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesBoardComponent } from "./components/articles-board/articles-board.component";

const routes: Routes = [{
  path: '', component: ArticlesBoardComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
