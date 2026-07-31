import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storageKey = 'portfolio:theme';
  get theme(): Theme {
    const stored = localStorage.getItem(this.storageKey) as Theme | null;
    return stored ?? (document.documentElement.getAttribute('data-theme') as Theme) ?? 'light';
  }
  set theme(value: Theme) {
    document.documentElement.setAttribute('data-theme', value);
    localStorage.setItem(this.storageKey, value);
  }
  toggle() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
  }
  init() {
    const t = this.theme;
    document.documentElement.setAttribute('data-theme', t);
  }
}
