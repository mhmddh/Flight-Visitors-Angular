import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightNumberComponent } from './flight-number.component';

@NgModule({
    declarations: [FlightNumberComponent],
    imports: [CommonModule],
    exports: [FlightNumberComponent],
})
export class FlightNumberModule {}
