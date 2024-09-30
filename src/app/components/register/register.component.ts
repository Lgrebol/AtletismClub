import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  dni: string = '';
  federatedCode: string = '';
  fullName: string = '';
  phone: string = '';
  email: string = '';
  dniLetter = '';

  selectedDistances: { [key: string]: boolean } = {
    '100m': false,
    '200m': false,
    '400m': false,
    '800m': false,
    '1000m': false
  };

  totalDistance: number = 0;
  maxDistance: number = 1200;

  calculateDniLetter(dniNumber: string): string {
    const dniLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const dniNumberInt = parseInt(dniNumber, 10);
    const remainder = dniNumberInt % 23;
    return dniLetters.charAt(remainder);
  }

  onDniInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const dniValue = input.value;

    if (dniValue.length === 8 && !isNaN(Number(dniValue))) {
      this.dniLetter = this.calculateDniLetter(dniValue);
      input.value = dniValue + this.dniLetter; 
    }
    this.dni = input.value;
  }

  isFormInvalid(): boolean {
    return !this.dni || !this.federatedCode || !this.fullName || !this.phone || !this.email;
  }

  onDistanceChange(event: Event, distance: string, meters: number): void {
    const input = event.target as HTMLInputElement;
    this.selectedDistances[distance] = input.checked;

    if (input.checked) {
      this.totalDistance += meters;
    } else {
      this.totalDistance -= meters;
    }
    
    this.toggleCheckboxes();
  }

  toggleCheckboxes(): void {
    const totalSelected = this.totalDistance;

    for (let distance in this.selectedDistances) {
      const isDisabled = totalSelected > this.maxDistance && !this.selectedDistances[distance];
      document.querySelector(`input[name="${distance}"]`)?.toggleAttribute('disabled', isDisabled);
    }
  }
}
