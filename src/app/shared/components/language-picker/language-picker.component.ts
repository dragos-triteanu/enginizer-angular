import { AfterContentInit, Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

declare let $: any;

@Component({
    selector: 'app-language-picker',
    templateUrl: './language-picker.component.html',
    styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent implements AfterContentInit {
    languageKey = 'user-language';
    activeLanguage;

    constructor(private translationService: TranslateService) {
    }

    ngAfterContentInit() {
        this.activeLanguage = this.translationService.currentLang;
        $('.dropdown-trigger').dropdown();
    }

    translate(language) {
        this.translationService.use(language);
        localStorage.setItem(this.languageKey, language);
        this.activeLanguage = language;
    }
}
