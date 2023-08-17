import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
  name: 'wordsLighter'
})
export class WordsLighterPipe implements PipeTransform {
  private _sanitizer = inject(DomSanitizer);

  transform(inputParagraph: string, wordsArray: string[]): SafeHtml {
    const wordsArrayFromParagraph = inputParagraph.split(' ');
    const wordsLighterArray: string[] = []

      wordsArrayFromParagraph.map((wordFromParagraph:string) => {
      if (/[.,!?;:"]$/.test(wordFromParagraph)) {
        const deletedSymbol: string = wordFromParagraph.slice(-1)
        wordsArray.map((word: string) => {
          if (word.toLowerCase() === wordFromParagraph.slice(0,-1).toLowerCase()) {
            wordsLighterArray.push('<span class="bg-yellow-400 bg-opacity-60">' + wordFromParagraph.slice(0,-1) + '</span>' + deletedSymbol)
          }
        })
      }
      else {
        wordsArray.map((word: string) => {
          if (word.toLowerCase() === wordFromParagraph.toLowerCase()) {
            wordsLighterArray.push('<span class="bg-yellow-400 bg-opacity-60">' + wordFromParagraph + '</span>')
          }
        })
      }
      wordsLighterArray.push(wordFromParagraph)
    })

    return this._sanitizer.bypassSecurityTrustHtml(wordsLighterArray.join(' '))
  }

}
