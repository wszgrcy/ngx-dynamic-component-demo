import { Directive, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { take, filter, map } from 'rxjs/operators';
@Directive({
  selector: 'custom-libwc[ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LazyFormDirective),
      multi: true,
    },
  ],
})
export class LazyFormDirective implements ControlValueAccessor {
  onChange: (arg) => void;
  onTouched: (arg) => void;
  instance: ControlValueAccessor;
  writeValue$ = new Subject();
  onChange$ = new Subject<(arg) => void>();
  onTouched$ = new Subject<(arg) => void>();

  value = [];
  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.waitComponentLoaded().then((component) => {
      this.instance = component;
      this.onChange$.next(this.onChange);
      this.onTouched$.next(this.onTouched);
      this.value.forEach((e) => {
        this.writeValue$.next(e);
      });
    });
    this.writeValue$.subscribe((value) => {
      if (this.instance) {
        this.instance.writeValue(value);
      } else {
        this.value.push(value);
      }
    });
    this.onChange$.pipe(filter(Boolean)).subscribe((e: (arg) => void) => {
      if (this.instance) {
        this.instance.registerOnChange(e);
        this.onChange$.complete();
      } else {
        this.onChange = e;
      }
    });
    this.onTouched$.pipe(filter(Boolean)).subscribe((e: (arg) => void) => {
      if (this.instance) {
        this.instance.registerOnTouched(e);
        this.onTouched$.complete();
      } else {
        this.onTouched = e;
      }
    });
  }

  registerOnChange(fn): void {
    this.onChange$.next(fn);
  }
  registerOnTouched(fn): void {
    this.onTouched$.next(fn);
  }
  writeValue(value): void {
    this.writeValue$.next(value);
  }
  waitComponentLoaded(): Promise<ControlValueAccessor> {
    return fromEvent(this.elementRef.nativeElement, 'componentIsLoaded')
      .pipe(
        filter((e: any) => e.detail),
        map((e) => e.detail),
        take(1)
      )
      .toPromise();
  }
}
