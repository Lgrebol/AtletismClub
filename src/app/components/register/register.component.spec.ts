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

  it('should have the labels: 100m llisos, 200m llisos, 400m llisos, 800m llisos, 1000m llisos', () => {
    expect(getNthLabel(5)?.textContent).toBe("100m llisos ");
    expect(getNthLabel(6)?.textContent).toBe("200m llisos ");
    expect(getNthLabel(7)?.textContent).toBe("400m llisos ");
    expect(getNthLabel(8)?.textContent).toBe("800m llisos ");
    expect(getNthLabel(9)?.textContent).toBe("1000m llisos ");
  });

  it('should have a sumbit button', () => {
    const sumbitButton = compiled.querySelector('button[type="submit"]');
    expect(sumbitButton).toBeTruthy();
    expect(sumbitButton?.textContent).toBe('Inscripció');
  });

  it('should append the letter "Z" to the DNI field after entering 8 digits', () => {
    const dniInput = compiled.querySelector('input[name="dni"]') as HTMLInputElement;
    dniInput.value = '12345678';
    dniInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    expect(dniInput.value).toBe('12345678Z');
 });
});
