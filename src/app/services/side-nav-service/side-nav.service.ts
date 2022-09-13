import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SideNavService {
    private currentLang = localStorage.getItem('currentLang') || 'en';
    private currentLang$ = new BehaviorSubject(this.currentLang);
    private themeMode = localStorage.getItem('themeMode') || 'dark';
    private themeMode$ = new BehaviorSubject(this.themeMode);

    getCurrentLang(): Observable<string> {
        return this.currentLang$.asObservable();
    }

    setCurrentLang(lang: string): void {
        localStorage.setItem('currentLang', lang);
        this.currentLang$.next(lang);
    }

    getThemeMode(): Observable<string> {
        return this.themeMode$.asObservable();
    }

    setThemeMode(theme: string): void {
        localStorage.setItem('themeMode', theme);
        this.themeMode$.next(theme);
    }
}
