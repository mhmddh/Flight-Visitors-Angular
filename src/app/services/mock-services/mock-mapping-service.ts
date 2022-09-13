import { Injectable } from '@angular/core';
import { Person } from 'src/app/models/person';

@Injectable({
    providedIn: 'root',
})
export class MockMappingService {
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
}
