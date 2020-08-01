import { Injectable, Injector, Compiler } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LazyLoadService {
  private map = new Map([
    [
      'libwc',
      () =>
        import('libwc').then((e) =>
          e.LibwcModule.loadComponent(this.injector, this.compiler)
        ),
    ],
  ]);
  private loadingMap = new Map<string, Promise<void>>();
  constructor(private injector: Injector, private compiler: Compiler) {}
  load(key: string) {
    if (this.loadingMap.has(key)) {
      return this.loadingMap.get(key);
    }
    const loading = new Promise<any>((res, rej) => {
      if (!this.map.has(key)) {
        rej('没有找到相关懒加载模块');
      } else {
        res(this.map.get(key)());
      }
    });
    this.loadingMap.set(key, loading);
    return loading;
  }
}
