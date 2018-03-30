import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTaxInfoComponent } from './company-tax-info.component';

describe('CompanyTaxInfoComponent', () => {
  let component: CompanyTaxInfoComponent;
  let fixture: ComponentFixture<CompanyTaxInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTaxInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTaxInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
