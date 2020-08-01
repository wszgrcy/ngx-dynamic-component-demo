import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loaded = false;
  value = '传入值';
  valueChange(e) {
    console.log('值变更', e);
  }
  call(e) {
    console.log('output', e);
  }
}
