import { ComponentFixture, TestBed } from '@angular/core/testing';
import { columnDefs } from 'config';
import { Person } from 'src/app/models/person';
import { MappingService } from 'src/app/services/mapping-service/mapping-service';
import { MockMappingService } from 'src/app/services/mock-services/mock-mapping-service';
import { TableListComponent } from './table.component';
import { personSample } from 'src/assets/static-data/static-data';

describe('TableComponent', () => {
    let component: TableListComponent;
    let fixture: ComponentFixture<TableListComponent>;
    const personsArray = [personSample];
    let service: MappingService;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TableListComponent],
            providers: [
                { provide: MappingService, useClass: MockMappingService },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TableListComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(MappingService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should sort ascending , descending when click on each field name', () => {
        columnDefs.forEach((colDef) => {
            expect(colDef.sortable).toBeTrue();
        });
    });

    it('should display Unspecified for gender and Standard for flight type when person gender or flight not specified', () => {
        const persons = service.mapPersons(personsArray);
        persons.forEach((person: Person) => {
            expect(person.gender).toEqual('Unspecified');
            expect(person.type).toEqual('Standard');
        });
    });
});
