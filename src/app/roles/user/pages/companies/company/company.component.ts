import {AfterContentInit, Component, OnInit} from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

declare let $: any;

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, AfterContentInit {
    languageKey = 'user-language';
    company: { id: number };

    constructor(private translationService: TranslateService) {
    }

    ngOnInit() { }

    ngAfterContentInit(): void {
        $('ul.tabs').tabs();

        // Remove the "active" class from First Tab
        $('li.tab').first().children().removeClass('active');
    }

    translate(language) {
        this.translationService.use(language);
        localStorage.setItem(this.languageKey, language);
    }
}
