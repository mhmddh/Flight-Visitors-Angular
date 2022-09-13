import { Component, Input } from '@angular/core';
import { Person } from 'src/app/models/person';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent {
    @Input() person!: Person;
}
