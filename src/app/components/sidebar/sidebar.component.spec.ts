import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {
    TranslateLoader,
    TranslateModule,
    TranslateService,
} from '@ngx-translate/core';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { HttpLoaderFactory } from 'src/app/pages/home/home.module';
import { MockSideNavService } from 'src/app/services/mock-services/mock-side-nav.service';
import { SideNavService } from 'src/app/services/side-nav-service/side-nav.service';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
    let component: SidebarComponent;
    let fixture: ComponentFixture<SidebarComponent>;
    let homeComponent: HomeComponent;
    let homeFixture: ComponentFixture<HomeComponent>;
    let service: SideNavService;
    let spyService;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient],
                    },
                    defaultLanguage: 'en',
                }),
                HttpClientModule,
                StoreModule.forRoot({}),
            ],
            declarations: [SidebarComponent, HomeComponent],
            providers: [
                TranslateService,
                { provide: SideNavService, useClass: MockSideNavService },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        const store: any = {};
        const mockLocalStorage = {
            getItem: (key: string): string => {
                return key in store ? store[key] : null;
            },
            setItem: (key: string, value: string) => {
                store[key] = `${value}`;
            },
        };
        spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
        spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;
        homeFixture = TestBed.createComponent(HomeComponent);
        homeComponent = homeFixture.componentInstance;
        service = TestBed.inject(SideNavService);
        spyService = fixture.detectChanges();
    });

    it('should display last theme mode and last language, unless no localstorage data stored the default theme mode is dark and the default language is english', () => {
        service.getCurrentLang().subscribe((lang: string) => {
            expect(lang).toEqual(localStorage.getItem('lang') || 'en');
        });
        service.getThemeMode().subscribe((theme: string) => {
            expect(theme).toEqual(localStorage.getItem('themeMode') || 'dark');
        });
        expect(component).toBeTruthy();
    });

    it('should default theme mode is dark', () => {
        expect(component.themeMode).toEqual('dark');
    });

    it('should default language is english', () => {
        expect(component.currentLang).toEqual('en');
    });

    it('should toggle theme mode', () => {
        spyService = spyOn(service, 'getThemeMode').and.callThrough();
        homeComponent.changeTheme('light');
        homeFixture.detectChanges();
        expect(homeComponent.themeMode).toEqual('light');
        homeComponent.changeTheme('dark');
        homeFixture.detectChanges();
        expect(homeComponent.themeMode).toEqual('dark');
        expect(spyService).toHaveBeenCalledTimes(2);
    });

    it('should change language', () => {
        spyService = spyOn(service, 'getCurrentLang').and.callThrough();
        homeComponent.changeCurrentLang('ar');
        homeFixture.detectChanges();
        expect(homeComponent.currentLang).toEqual('ar');
        homeComponent.changeCurrentLang('en');
        homeFixture.detectChanges();
        expect(homeComponent.currentLang).toEqual('en');
        expect(spyService).toHaveBeenCalledTimes(2);
    });
});
