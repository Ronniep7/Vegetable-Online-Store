import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
    transform(pipeData:string[], pipeModifier:string): string[] {
        return pipeData.filter((eachItem) => {
          return eachItem['name'].toLowerCase().includes(pipeModifier.toLowerCase());
        });
     
      }}