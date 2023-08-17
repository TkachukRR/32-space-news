import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ArticlesBoardComponent } from './components/articles-board/articles-board.component';
import { ArticleCardComponent } from "./components/article-card/article-card.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { WordsLighterPipe } from './pipes/words-lighter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesBoardComponent,
    ArticleCardComponent,
    WordsLighterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
