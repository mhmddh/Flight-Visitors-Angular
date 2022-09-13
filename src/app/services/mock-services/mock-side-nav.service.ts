import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MockSideNavService {
    private currentLang = localStorage.getItem('currentLang') || 'en';
    private currentLang$ = new BehaviorSubject(this.currentLang);
    private themeMode = localStorage.getItem('themeMode') || 'dark';
    private themeMode$ = new BehaviorSubject(this.themeMode);

    getCurrentLang(): Observable<string> {
        return this.currentLang$.asObservable();
    }
    setCurrentLang(lang: string): void {
        this.currentLang$.next(lang);
    }
    getThemeMode(): Observable<string> {
        return this.themeMode$.asObservable();
    }
    setThemeMode(theme: string): void {
        this.themeMode$.next(theme);
    }
}
