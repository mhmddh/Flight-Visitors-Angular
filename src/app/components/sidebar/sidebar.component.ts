import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SideNavService } from 'src/app/services/side-nav-service/side-nav.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    @Input() themeMode!: string;
    @Input() currentLang!: string;
    @Output() changeThemeEvent = new EventEmitter();
    @Output() changeLangEvent = new EventEmitter();

    constructor(private sidenavService: SideNavService) {}

    ngOnInit(): void {
        this.getThemeService();
        this.getCurrentLangService();
    }

    changeCurrentLang(event: any): void {
        const lang = event.value;
        this.changeLangEvent.emit(lang);
    }

    changeTheme(event: any): void {
        const theme = event.value;
        this.changeThemeEvent.emit(theme);
    }

    getThemeService(): void {
        this.sidenavService.getThemeMode().subscribe((theme: string) => {
            this.themeMode = theme;
        });
    }

    getCurrentLangService(): void {
        this.sidenavService.getCurrentLang().subscribe((lang: string) => {
            this.currentLang = lang;
        });
    }
}
