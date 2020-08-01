import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'lib-libwc',
  template: `
    <div>
      <label for="">{{ title }}</label>
      <input
        type="text"
        [(ngModel)]="value"
        (ngModelChange)="change($event)"
        [disabled]="disabled"
      />
    </div>
  `,
  styles: [],
  providers: [],
})
export class LibwcComponent implements OnInit, ControlValueAccessor {
  @Input() title = '';
  @Output() libValueChange = new EventEmitter();
  @Output() componentIsLoaded = new BehaviorSubject(null);
  onChange: (arg) => void;
  onTouched: (arg) => void;
  value;
  disabled = false;
  constructor() {
    console.log('函数构造');
    this.componentIsLoaded.next(this);
  }

  ngOnInit(): void {}
  writeValue(value): void {
    this.value = value;
  }
  registerOnChange(fn): void {
    this.onChange = fn;
  }
  registerOnTouched(fn): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  change(e): void {
    this.onChange(e);
    this.libValueChange.emit(e);
  }
}
