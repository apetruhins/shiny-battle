import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShinyListComponent } from './shiny-list.component';

describe('ShinyListComponent', () => {
  let component: ShinyListComponent;
  let fixture: ComponentFixture<ShinyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShinyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShinyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
