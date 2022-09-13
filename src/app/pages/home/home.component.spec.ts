import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Person } from 'src/app/models/person';
import { ApiService } from 'src/app/services/api-service/api.service';
import { MockApiService } from 'src/app/services/mock-services/mock-api-service';
import { HomeComponent } from './home.component';
import { filteredPerson } from 'src/assets/static-data/static-data';
import {
    TranslateLoader,
    TranslateModule,
    TranslateService,
} from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpLoaderFactory } from './home.module';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { ToolPanelComponent } from 'src/app/components/tool-panel/tool-panel.component';
import { TableListComponent } from 'src/app/components/table/table.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { SpinnerComponent } from 'src/app/components/table/cell-renderer/spinner/spinner.component';
import { StoreModule } from '@ngrx/store';

describe('HomePage', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let service: ApiService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent,
                NavbarComponent,
                SidebarComponent,
                ToolPanelComponent,
                TableListComponent,
                SpinnerComponent,
            ],
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
                MatIconModule,
                MatCardModule,
                MatSidenavModule,
                MatCheckboxModule,
                BrowserAnimationsModule,
                FormsModule,
                MatRadioModule,
                ReactiveFormsModule,
                StoreModule.forRoot({}),
            ],
            providers: [
                { provide: ApiService, useClass: MockApiService },
                TranslateService,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(ApiService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display persons onload homepage in list view as default view', () => {
        component.ngOnInit();
        const Element: HTMLElement = fixture.nativeElement;
        const tableList = Element.querySelector('app-table')!;
        expect(tableList).toBeTruthy();
        service.getPersons().subscribe((persons) => {
            expect(persons.length).toBeGreaterThan(1);
        });
    });

    it('should toggle to Grid View', () => {
        component.toggleView();
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(component.isGrid).toBeTrue();
        expect(compiled.querySelector('.cards-list')).toBeTruthy();
    });

    it('should toggle to Table List View', () => {
        fixture.detectChanges(); //to detect new element rendered
        const compiled = fixture.nativeElement as HTMLElement;
        expect(component.isGrid).toBeFalse();
        expect(compiled.querySelector('app-table')).toBeTruthy();
    });

    it('should no data displayed when persons not given', () => {
        component.ngOnInit();
        expect(component.allPersons).toEqual([]);
    });

    it('should filter persons based on entered input', (done) => {
        service.getPersons().subscribe((persons: Person[]) => {
            component.allPersons = persons;
            expect(component.filterPersons('Martin')).toEqual(filteredPerson);
            done();
        });
    });
});
