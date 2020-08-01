import {
  Directive,
  ElementRef,
  ViewContainerRef,
  Input,
  Injector,
  Compiler,
  TemplateRef,
} from '@angular/core';

@Directive({
  selector: '[lazyLoad]',
})
export class LazyLoadDirective {
  @Input() private readonly lazyLoad = 'libwc';
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private compiler: Compiler
  ) {
    import('libwc').then((e) => {
      e.LibwcModule.loadComponent(this.injector, this.compiler);
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    });
  }
}
