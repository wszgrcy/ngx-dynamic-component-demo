import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyFormDirective } from './lazy-form.directive';
import { LazyLoadModule, createWebComponent } from 'cyia-ngx-common/lazy-load';
@NgModule({
  declarations: [AppComponent, LazyFormDirective],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadModule.forRoot([
      [
        'libwc',
        (injector, compiler) =>
          import('libwc').then((e) =>
            createWebComponent(
              injector,
              compiler,
              e.LibwcModule,
              'custom-libwc'
            )
          ),
      ],
      [
        'libwc2',
        (injector, compiler) =>
          import('libwc').then((e) =>
            createWebComponent(
              injector,
              compiler,
              e.LibwcModule,
              'custom-libwc2'
            )
          ),
      ],
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
