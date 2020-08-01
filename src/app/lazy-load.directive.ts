import { LazyLoadService } from './lazy-load.service';
import {
  Directive,
  ElementRef,
  ViewContainerRef,
  Input,
  Injector,
  Compiler,
  TemplateRef,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[lazyLoad]',
})
export class LazyLoadDirective {
  @Input() private lazyLoad;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private lazyLoadService: LazyLoadService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.lazyLoad) {
      this.lazyLoadService.load(this.lazyLoad).then(() => {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      });
    }
  }
}
