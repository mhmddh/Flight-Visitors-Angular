import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {
    TranslateLoader,
    TranslateModule,
    TranslateService,
} from '@ngx-translate/core';
import { Person } from 'src/app/models/person';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { HttpLoaderFactory } from 'src/app/pages/home/home.module';
import { ApiService } from 'src/app/services/api-service/api.service';
import * as Actions from './applicants.action';

describe('Store > Actions > ApplicantsAction', () => {
    let service: ApiService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
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
            providers: [TranslateService, HttpClient],
        }).compileComponents();
    });

    beforeEach(() => {
        service = TestBed.inject(ApiService);
    });

    it('SHOULD create a Load applicants requests action', () => {
        const action = Actions.loadApplicantsRequest();
        expect(action).toEqual({
            type: '[Applicants] Load Applicants Request',
        });
    });

    it('SHOULD create a Load applicants success action', (done) => {
        let results: Person[] = [];
        service.getPersons().subscribe((persons: Person[]) => {
            results = persons;
        });
        done();
        const action = Actions.loadApplicantsSuccess({ applicants: results });
        expect(action).withContext('expected persons').toEqual({
            type: '[Applicants] Load Applicants Success',
            applicants: results,
        });
    });
});
