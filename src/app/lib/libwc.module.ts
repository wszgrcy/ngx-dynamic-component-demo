import { NgModule, Injector, Compiler, NgModuleFactory } from '@angular/core';
import { LibwcComponent } from './libwc.component';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [LibwcComponent],
  imports: [FormsModule],
  exports: [LibwcComponent],
  providers: [],
})
export class LibwcModule {
  entry = LibwcComponent;
}
