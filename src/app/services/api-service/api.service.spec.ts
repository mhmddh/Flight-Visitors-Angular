import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Person } from 'src/app/models/person';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { HttpLoaderFactory } from 'src/app/pages/home/home.module';
import { ApiService } from './api.service';

describe('ApiService', () => {
    let service: ApiService;
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [
                HttpClientModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient],
                    },
                    defaultLanguage: 'en',
                }),
                BrowserAnimationsModule,
                StoreModule.forRoot({}),
            ],
        });
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(ApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return expected persons', (done) => {
        service.getPersons().subscribe((persons: Person[]) => {
            component.allPersons = persons;
            expect(persons).toEqual(component.allPersons);
        });
        done();
    });
});
