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
import { SideNavService } from 'src/app/services/side-nav-service/side-nav.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
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
            declarations: [NavbarComponent, HomeComponent, SidebarComponent],
            providers: [TranslateService, SideNavService],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should navbar header component will be displayed with title and settings button on top onload of the home page', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.settings-icon')).toBeTruthy();
        expect(component.title).toBeDefined();
        expect(component).toBeTruthy();
    });

    it('Should settings side bar menu hide', () => {
        spyOn(component, 'toggleMenu');
        const button =
            fixture.debugElement.nativeElement.querySelector('.settings-icon');
        button.click();
        button.click();
        expect(component.toggleMenu).toHaveBeenCalledTimes(2);
    });

    it('Should settings side bar menu will be displayed from the left', () => {
        spyOn(component, 'toggleMenu');
        const button =
            fixture.debugElement.nativeElement.querySelector('.settings-icon');
        button.click();
        expect(component.toggleMenu).toHaveBeenCalled();
    });
});
