import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Algoritmo01Component } from './algoritmo01.component';

describe('Algoritmo01Component', () => {
  let component: Algoritmo01Component;
  let fixture: ComponentFixture<Algoritmo01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Algoritmo01Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Algoritmo01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
