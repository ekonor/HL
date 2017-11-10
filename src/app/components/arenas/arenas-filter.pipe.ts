import { Pipe, PipeTransform } from '@angular/core';

import { Arena } from './arenas';

@Pipe({
    name: 'arenasfilter',
    pure: false
})
export class ArenasFilterPipe implements PipeTransform {
  transform(items: Arena[], filter: Arena): Arena[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Arena) => this.applyFilter(item, filter));
  }

  /**
   * Perform the filtering.
   *
   * @param {Arena} arena The arena to compare to the filter.
   * @param {Arena} filter The filter to apply.
   * @return {boolean} True if arena satisfies filters, false if not.
   */
  applyFilter(arena: Arena, filter: Arena): boolean {
    for (let field in filter) {
      if (filter[field] && filter[field].length) {
        console.log(filter[field]);
        if (typeof filter[field] === 'string') {
          if (arena[field] && arena[field].length) {
            if (arena[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
              return false;
            }
          }
        } else if (typeof filter[field] === 'number') {
          if (arena[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
