import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loaded = false;
  value = '传入值';
  formGroup = this.fb.group({
    lazy: '123',
  });
  valueChange(e) {
    console.log('值变更', e);
  }
  call(e) {
    console.log('output', e);
  }
  constructor(private fb: FormBuilder) {
    this.formGroup.valueChanges.subscribe((e) => {
      console.log('响应式变更', e);
    });
  }
}
