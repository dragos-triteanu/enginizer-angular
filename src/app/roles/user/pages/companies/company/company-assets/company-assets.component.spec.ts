import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAssetsComponent } from './company-assets.component';

describe('CompanyAssetsComponent', () => {
  let component: CompanyAssetsComponent;
  let fixture: ComponentFixture<CompanyAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
