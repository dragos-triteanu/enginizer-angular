import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAssociatesComponent } from './company-associates.component';

describe('CompanyAssociatesComponent', () => {
  let component: CompanyAssociatesComponent;
  let fixture: ComponentFixture<CompanyAssociatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAssociatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAssociatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
