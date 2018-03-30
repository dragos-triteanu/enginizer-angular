import { ToastsManager } from 'ng2-toastr';
import { Component, HostListener, ViewContainerRef } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Log } from "ng2-logger";
import { AuthenticationService } from "@app/authentication/services/authentication.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    _logger = Log.create(AppComponent.name);
    languageKey = "user-language";

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHandler(event) {
        // used for operations before unloading
    }

    @HostListener('window:load', ['$event'])
    onLoadHandler(event) {
        // used for cleanup on loading
    }

    get currentLanguage() {
        const storedLang = localStorage.getItem(this.languageKey);
        const browserLang = this.translate.getBrowserLang();
        return storedLang || browserLang;
    }

    constructor(private translate: TranslateService,
                private toastr: ToastsManager,
                private router: Router,
                private authenticationService: AuthenticationService,
                vRef: ViewContainerRef) {
        translate.addLangs(['en', 'ro']);
        translate.setDefaultLang('ro');

        translate.use(this.currentLanguage);
        toastr.setRootViewContainerRef(vRef);

    }
}
