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
    expect(getNthLabel(0)?.textContent).toBe("DNI ");
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

  it('should have a submit button', () => {
    const submitButton = compiled.querySelector('button[type="submit"]');
    expect(submitButton).toBeTruthy();
    expect(submitButton?.textContent).toBe('Inscripció');
  });

  it('should append the correct letter to the DNI field after entering 8 digits', () => {
    const dniInput = compiled.querySelector('input[name="dni"]') as HTMLInputElement;
    dniInput.value = '12345678';
    dniInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const expectedLetter = component.calculateDniLetter('12345678');
    expect(dniInput.value).toBe('12345678' + expectedLetter);
  });

  it('should disable the submit button if any field is empty', () => {
    const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(submitButton?.disabled).toBe(true);
});

it('should disable the other checkboxes if the total is more than 1200', () => {
  const checkboxes = compiled.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;

  // Select the first 100m and 200m races (total 300m)
  checkboxes[0].checked = true;
  checkboxes[0].dispatchEvent(new Event('change'));
  checkboxes[1].checked = true;
  checkboxes[1].dispatchEvent(new Event('change'));
  fixture.detectChanges();

  checkboxes.forEach(checkbox => {
    expect(checkbox.disabled).toBe(false);
  });

  checkboxes[4].checked = true;
  checkboxes[4].dispatchEvent(new Event('change'));
  fixture.detectChanges();

  checkboxes.forEach((checkbox, index) => {
    if (!checkbox.checked) {
      expect(checkbox.disabled).toBe(true);
    }
  });

  checkboxes[4].checked = false;
  checkboxes[4].dispatchEvent(new Event('change'));
  fixture.detectChanges();

  checkboxes.forEach(checkbox => {
    expect(checkbox.disabled).toBe(false);
  });
});

});