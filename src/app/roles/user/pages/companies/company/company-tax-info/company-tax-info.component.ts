import {AfterContentInit, Component, OnInit} from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-company-tax-info',
  templateUrl: './company-tax-info.component.html',
  styleUrls: ['./company-tax-info.component.scss']
})
export class CompanyTaxInfoComponent implements OnInit, AfterContentInit {

  constructor() { }

  ngOnInit() {
  }

    ngAfterContentInit(): void {
    }

}
