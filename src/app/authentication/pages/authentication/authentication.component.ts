import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare let $: any;

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
    languageKey = 'user-language';

    constructor(private translationService: TranslateService) {
    }

    ngOnInit() {
    }

    translate(language) {
        this.translationService.use(language);
        localStorage.setItem(this.languageKey, language);
    }
}
