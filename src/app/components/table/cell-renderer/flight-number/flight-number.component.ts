import { Component } from '@angular/core';

@Component({
    selector: 'app-flight-number',
    templateUrl: './flight-number.component.html',
    styleUrls: ['./flight-number.component.scss'],
})
export class FlightNumberComponent {
    cellValue!: string;
    imgSrc!: string;
    flightNumber!: string;

    agInit(params: any): void {
        this.cellValue = params.value;
        this.imgSrc = this.cellValue[0];
        this.flightNumber = this.cellValue[1];
    }

    refresh(params: any): boolean {
        this.cellValue = params.value;
        this.imgSrc = this.cellValue[0];
        this.flightNumber = this.cellValue[1];
        return true;
    }
}
