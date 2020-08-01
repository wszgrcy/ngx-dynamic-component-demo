import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { LazyLoadDirective } from './lazy-load.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyFormDirective } from './lazy-form.directive';
@NgModule({
  declarations: [AppComponent, LazyLoadDirective, LazyFormDirective],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
