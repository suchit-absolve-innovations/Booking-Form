import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunkPipe'
})
export class ChunkPipePipe implements PipeTransform {

  transform(array: any[], size: number): any[] {
    if (!array) return [];
    return array.reduce((acc, val, i) => {
      let idx = Math.floor(i / size);
      let page = acc[idx] || (acc[idx] = []);
      page.push(val);
      return acc;
    }, []);

  }
}
