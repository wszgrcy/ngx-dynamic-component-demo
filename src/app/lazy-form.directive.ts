import {
  Directive,
  ElementRef,
  forwardRef,
  SimpleChanges,
  Input,
} from '@angular/core';
import { NgElementConstructor } from '@angular/elements';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, BehaviorSubject, Subject } from 'rxjs';
import { take, filter, map, takeWhile } from 'rxjs/operators';
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
  onChange;
  onTouched;
  instance: ControlValueAccessor;
  writeValue$ = new Subject();
  value = [];
  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.waitComponentLoaded().then((component) => {
      console.log('组件加载完成');
      this.instance = component;
      this.instance.registerOnChange(this.onChange);
      this.instance.registerOnTouched(this.onTouched);
      this.value.forEach((e) => {
        this.writeValue$.next(e);
      });
    });
    this.writeValue$.pipe().subscribe((value) => {
      // console.log('通知值变更')
      if (this.instance) {
        this.instance.writeValue(value);
      } else {
        this.value.push(value);
      }
    });
  }

  registerOnChange(fn): void {
    console.log('change注册', fn);
    this.onChange = fn;
  }
  registerOnTouched(fn): void {
    this.onTouched = fn;
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
