import { Pipe, PipeTransform } from '@angular/core';
import * as md from "markdown-it"
import * as hljs from "highlight.js"

@Pipe({
  name: 'mdp'
})
export class MdpPipe implements PipeTransform {

  

  transform(value: string, ...args: unknown[]): unknown {
    return md({
      highlight: function (str: string, lang: string) {
        if (lang && hljs.default.getLanguage(lang)) {
          try {
            console.log("highlighted", hljs.default.highlight(str, { language: lang }).value)
            return hljs.default.highlight(str, { language: lang }).value;
          } catch (__) {}
        }
    
        return ''; // use external default escaping
      }
    }).render(value);

  }

}
