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
  constructor(injector: Injector) {
    const el = createCustomElement(LibwcComponent, { injector });
    customElements.define('custom-libwc', el);
  }
  static loadComponent(injector: Injector, compiler: Compiler) {
    const module = LibwcModule;
    let factory: NgModuleFactory<any>;
    if (module instanceof NgModuleFactory) {
      factory = module as any;
    } else {
      factory = compiler.compileModuleSync(LibwcModule);
    }
    return factory.create(injector);
  }
}
