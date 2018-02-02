import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { JWTUser } from '../shared/models/jwt-data.model';

@Component({
    selector: 'app-core',
    templateUrl: './core.component.html',
    styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
    currentUser: JWTUser;
    languageKey = "user-language";

    noSidebarRoles = [
        'MILKRUN_OPERATOR'
    ];

    get languages() {
        return this.translateService.getLangs();
    }

    get currentLanguage() {
        return this.translateService.currentLang;
    }

    get hasSidebar() {
        return !this.noSidebarRoles.find(role => role === this.currentUser.role);
    }

    constructor(private router: Router, public translateService: TranslateService, private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.currentUser = this.authService.getUserDetails();
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['auth']);
    }

    onLanguageChange(language) {
        this.translateService.use(language);
        localStorage.setItem(this.languageKey, language);
    }
}
