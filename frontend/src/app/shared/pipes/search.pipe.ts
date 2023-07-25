import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string, searchStatus: string[]): any[] {
    if (!items) return [];
    if (searchStatus === null) return searchStatus = [''];
    if ((!searchText && searchStatus.length === 0) || (searchText === '' && searchStatus.length === 0)) return items;
    searchText = searchText.toLowerCase();
  
    return items.filter(item => {
      const projectNameMatch = searchText === '' || item.projectName.toLowerCase().includes(searchText);
      const projectStatusMatch = searchStatus.length === 0 || searchStatus.includes(item.projectStatus.toLowerCase());
  
      return projectNameMatch && projectStatusMatch;
    });
  }
  

}
