import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/**
 * RegisterComponent is responsible for handling user registration.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegisterComponent implements OnInit {
  /**
   * FormGroup instance for the registration form.
   */
  registerForm: FormGroup;

  /**
   * Creates an instance of RegisterComponent.
   * 
   * @param {FormBuilder} fb - FormBuilder instance for creating forms.
   * @param {AuthService} authService - AuthService instance for authentication.
   * @param {Router} router - Router instance for navigation.
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).*$/)
      ]],
      repeatPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/)]],
      terms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {}

  /**
   * Custom validator to check if the password and repeat password fields match.
   * 
   * @param {AbstractControl} control - The control to validate.
   * @returns { { [key: string]: boolean } | null } - The validation result.
   */
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');
    if (password && repeatPassword && password.value !== repeatPassword.value) {
      repeatPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  /**
   * Gets the form controls for easy access in the template.
   * 
   * @returns { { [key: string]: AbstractControl } } - The form controls.
   */
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Handles form submission. If the form is valid, it registers the user.
   */
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const user = {
      username: this.f['username'].value,
      name: this.f['name'].value,
      password: this.f['password'].value,
      email: this.f['email'].value,
      phone: this.f['phone'].value,
      role: 'user'
    };

    this.authService.register(user);
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    this.router.navigate(['/login']);
  }
}
