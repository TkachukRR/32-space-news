import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
  name: 'wordsLighter'
})
export class WordsLighterPipe implements PipeTransform {
  private _sanitizer = inject(DomSanitizer);

  transform(inputParagraph: string, wordsArray: string[]): SafeHtml {
    if (wordsArray.length === 0) return this._sanitizer.bypassSecurityTrustHtml(inputParagraph)

    const wordsArrayFromParagraph = inputParagraph.split(' ');
    const commonWords: string[] = []

    for (const wordFromParagraph of wordsArrayFromParagraph) {
      for (const word of wordsArray) {
        if (/[.,!?;:"]$/.test(wordFromParagraph) && wordFromParagraph.slice(0,-1).toLowerCase() === word.toLowerCase()) {
          commonWords.push(wordFromParagraph);
        }
        if (wordFromParagraph.toLowerCase() === word.toLowerCase()) {
          commonWords.push(wordFromParagraph);
        }
      }
    }

    wordsArrayFromParagraph.map((word, index) => {
        commonWords.map(commonWord => {
          if (word.toLowerCase() === commonWord.toLowerCase()) wordsArrayFromParagraph[index] = '<span style="background-color: rgba(255, 246, 25, 0.63); line-height: inherit; font-weight: inherit ; font-size: inherit;">' + word + '</span>'
        })
      }
    )

    return this._sanitizer.bypassSecurityTrustHtml(wordsArrayFromParagraph.join(' '))
  }

}
