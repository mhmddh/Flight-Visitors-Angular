import { Injectable } from '@angular/core';
import { Person } from '../../models/person';
import { columnDefs, arabicColumnDefs } from 'config';
import { ColDef } from 'ag-grid-community';

@Injectable({
    providedIn: 'root',
})
export class MappingService {
    mapPersons(persons: Person[]): Person[] {
        persons.forEach((person: Person) => {
            if (person.gender === '' || person.gender === undefined) {
                person.gender = 'Unspecified';
            }
            if (person.type === '' || person.type === undefined) {
                person.type = 'Standard';
            }
        });
        return persons;
    }

    mapColumnLanguages(lang: string): ColDef[] {
        let columns: ColDef[] = [];
        if (lang === 'ar') {
            columns = arabicColumnDefs;
        } else {
            columns = columnDefs;
        }
        return columns;
    }
}
