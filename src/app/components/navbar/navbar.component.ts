import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    title = 'VISITORS_MANAGEMENT_PLATFORM';
    @Output() toggleMenuEvent = new EventEmitter();

    toggleMenu(): void {
        this.toggleMenuEvent.emit();
    }
}
