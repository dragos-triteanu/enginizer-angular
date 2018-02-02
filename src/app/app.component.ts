import { ToastsManager } from 'ng2-toastr';
import { Component, HostListener, ViewContainerRef } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Log } from "ng2-logger";
import { NotificationService } from "@services/notification.service";
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
        this.saveDatetimeForUnload();
    }

    saveDatetimeForUnload() {
        localStorage.setItem('unload', new Date().toLocaleString());
    }

    @HostListener('window:load', ['$event'])
    onLoadHandler(event) {
        const unloadDateTimeString = localStorage.getItem('unload');
        if (!unloadDateTimeString) {
            this.forceLogout();
            return;
        }

        const unloadDateTime = new Date(unloadDateTimeString);
        const currentDatetime = new Date();
        const secondsBeforeLastSession = (currentDatetime.getTime() - unloadDateTime.getTime()) / 1000;
        if (secondsBeforeLastSession > 15) {
            this.forceLogout();
        }
    }

    get currentLanguage() {
        const storedLang = localStorage.getItem(this.languageKey);
        const browserLang = this.translate.getBrowserLang();
        return storedLang || browserLang;
    }

    constructor(private translate: TranslateService,
                private toastr: ToastsManager,
                private router: Router,
                private notificationService: NotificationService,
                private authenticationService: AuthenticationService,
                vRef: ViewContainerRef) {
        translate.addLangs(['en', 'ro']);
        translate.setDefaultLang('en');

        translate.use(this.currentLanguage);
        toastr.setRootViewContainerRef(vRef);

        this.notificationService.subscribeToMessageSource();
    }

    private forceLogout() {
        this.authenticationService.logout();
        this.router.navigate(['auth']);
    }
}
