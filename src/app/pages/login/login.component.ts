import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  @ViewChild('recoverModal') recoverModal!: ElementRef;

  username = '';
  password = '';
  recoverEmail = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.username.trim() === '' || this.password.trim() === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (this.authService.login(this.username, this.password)) {
      /*alert('Ha iniciado sesión');*/
      if (this.authService.getLoggedInUser().role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      alert('Usuario o Contraseña Invalida');
    }
  }

  onRecover(): void {
    if (!this.recoverEmail || !this.validateEmail(this.recoverEmail)) {
      /*alert('Por favor, ingresa un correo electrónico válido.');*/
      return;
    }
    // Simulate email recovery
    alert('Las instrucciones para recuperar la contraseña han sido enviadas a su correo.');
    
    // Hide the modal
    const modal = new bootstrap.Modal(this.recoverModal.nativeElement);
    modal.hide();
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailPattern.test(email);
  }
}
