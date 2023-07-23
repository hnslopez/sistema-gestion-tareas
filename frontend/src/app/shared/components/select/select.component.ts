import { Component, EventEmitter, Input, OnInit, Output, forwardRef} from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../../types/app-select.type';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  @Input() inputData: boolean = true;
  @Input() dataType!: "tag" | "member";
  @Input() placeholder!: string;
  @Input() isAsync?: boolean = true;
  @Input() size?: number;
  @Input() multiple?: boolean = false;

  @Input() valueFor: SelectOption[] = [];



  isLoading = false;
  randomUserUrl = 'https://api.randomuser.me/?results=5';
  searchChange$ = new BehaviorSubject('');
  optionList: string[] = [];
  
  selectedValue?: string;

  onChange: any = (_:any) => {};
  onTouched: any = (_:any) => {};

  constructor(private http: HttpClient) {}

  isNotSelected(value: string): boolean {
    return this.optionList.indexOf(value) === -1;
  }


  ngOnInit(): void {
    const getRandomNameList = (name: string): Observable<any> =>
      this.http
        .get(`${this.randomUserUrl}`)
        .pipe(
          catchError(() => of({ results: [] })),
          map((res: any) => res.results)
        )
        .pipe(
          map((list: any) => list.map((item: any) => `${item.name.first} ${name}`))
        );

    const optionList$: Observable<string[]> = this.searchChange$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(switchMap(getRandomNameList));
    optionList$.subscribe((data) => {
      this.optionList = data;
      this.isLoading = false;
    });
  }

  onSearch(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }

  onChangeValue(): void {
    this.onChange(this.selectedValue);
    this.onTouched();
  }

  // Métodos de ControlValueAccessor

  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implementa esta función si deseas habilitar o deshabilitar el componente en función del estado del formulario
  }
}
