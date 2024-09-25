import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  dniLetter = '';
  
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
  }
}