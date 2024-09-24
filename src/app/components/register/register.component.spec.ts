import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  function getNthLabel(index: number) {
    return compiled.querySelectorAll('label')[index];
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title Inscripció Proves Atletisme', () => {
    expect(compiled.querySelector('h1')?.textContent).toBe('Inscripció proves atletisme');
  });

  it('should have the subtitle Dades identificatives inside the first section', () => {
    const sectionTitle = compiled.querySelector('section h1')?.textContent;
    expect(sectionTitle).toBe('Dades identificatives');
  });

  it('should have the labels: DNI, Codi de federat, Nom i cognoms, Telèfon, Email', () => {
    expect(getNthLabel(0)?.textContent).toBe("DNI");
    expect(getNthLabel(1)?.textContent).toBe("Codi de federat");
    expect(getNthLabel(2)?.textContent).toBe("Nom i cognoms");
    expect(getNthLabel(3)?.textContent).toBe("Telèfon");
    expect(getNthLabel(4)?.textContent).toBe("Email");
  });

  it('should have the subtitle Inscripció inside the second section', () => {
    const secondSection = compiled.querySelectorAll('section')[1];
    const sectionTitle = secondSection.querySelector('h1')?.textContent;  
    expect(sectionTitle).toBe('Inscripció');
  });
  
});
