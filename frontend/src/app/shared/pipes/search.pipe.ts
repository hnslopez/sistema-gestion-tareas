import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string, searchStatus:string): any[] {
    if (!items) return [];
    if (searchStatus === null) searchStatus = '';
    if ((!searchText && !searchStatus) || (searchText === '' && searchStatus === '')) return items;
    searchText = searchText.toLowerCase();

    return items.filter(item => {
      const projectNameMatch = (searchText === '' || null) || item.projectName.toLowerCase().includes(searchText);
      const projectStatusMatch = (searchStatus === ''|| null) || item.projectStatus.toLowerCase().includes(searchStatus);

      return projectNameMatch && projectStatusMatch;
    });
  }

}
