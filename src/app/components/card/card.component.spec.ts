import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Person } from 'src/app/models/person';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { MappingService } from 'src/app/services/mapping-service/mapping-service';
import { MockMappingService } from 'src/app/services/mock-services/mock-mapping-service';
import { CardComponent } from './card.component';
import { personSample } from 'src/assets/static-data/static-data';
import {
    TranslateLoader,
    TranslateModule,
    TranslateService,
} from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/pages/home/home.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;
    let service: MappingService;
    const personsArray = [personSample];
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
            declarations: [CardComponent, HomeComponent],
            providers: [
                { provide: MappingService, useClass: MockMappingService },
                { provide: TranslateService },
                { provide: HttpClient },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
        component.person = personSample;
        service = TestBed.inject(MappingService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should replace person picture by unknown picture when it doesnt exist', () => {
        const compiled = fixture.nativeElement;
        const img = compiled.querySelector('.card-body img');
        expect(img.onerror.toString()).toContain(
            'assets/images/persons/unknown-person.jpg'
        );
        expect(
            component.person.picture === '' ||
                component.person.picture === undefined
        ).toBeTrue();
    });

    it('should display Unspecified for gender and Standard for flight type when person gender or flight not specified', () => {
        const persons = service.mapPersons(personsArray);
        persons.forEach((person: Person) => {
            expect(person.gender).toEqual('Unspecified');
            expect(person.type).toEqual('Standard');
        });
    });
});
