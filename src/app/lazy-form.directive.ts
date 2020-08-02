import { Directive, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LazyLoadFormControlDirective } from 'cyia-ngx-common/lazy-load';
@Directive({
  selector: `custom-libwc[ngModel],custom-libwc[formControlName]:not([ngModel])`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LazyFormDirective),
      multi: true,
    },
  ],
})
export class LazyFormDirective extends LazyLoadFormControlDirective {
  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
