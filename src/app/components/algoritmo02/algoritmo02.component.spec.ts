import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Algoritmo02Component } from './algoritmo02.component';

describe('Algoritmo02Component', () => {
  let component: Algoritmo02Component;
  let fixture: ComponentFixture<Algoritmo02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Algoritmo02Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Algoritmo02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
