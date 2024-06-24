import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

declare var bootstrap: any;

/**
 * Login component for user authentication.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  @ViewChild('recoverModal') recoverModal!: ElementRef;

  /** Username input */
  username = '';
  /** Password input */
  password = '';
  /** Email input for password recovery */
  recoverEmail = '';

  /**
   * Constructor for the LoginComponent.
   * @param authService - Authentication service for handling user login.
   * @param router - Router for navigation.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Handles the login form submission.
   * If the username and password are valid, navigates to the appropriate page based on user role.
   */
  onSubmit(): void {
    if (this.username.trim() === '' || this.password.trim() === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (this.authService.login(this.username, this.password)) {
      if (this.authService.getLoggedInUser().role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      alert('Usuario o Contraseña Invalida');
    }
  }

  /**
   * Handles the password recovery form submission.
   * Validates the email and simulates the password recovery process.
   * If the email is valid, shows an alert and hides the modal.
   */
  onRecover(): void {
    if (!this.recoverEmail || !this.validateEmail(this.recoverEmail)) {
      return;
    }
    alert('Las instrucciones para recuperar la contraseña han sido enviadas a su correo.');

    const modal = new bootstrap.Modal(this.recoverModal.nativeElement);
    modal.hide();
  }

  /**
   * Validates the email format.
   * @param email - The email to be validated.
   * @returns True if the email is valid, false otherwise.
   */
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailPattern.test(email);
  }
}
