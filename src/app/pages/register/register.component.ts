import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterComponent {
  username = '';
  name = '';
  password = '';
  repeatPassword = '';
  email = '';
  phone = '';
  terms = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.password !== this.repeatPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    const newUser = {
      username: this.username,
      name: this.name,
      password: this.password,
      email: this.email,
      phone: this.phone,
      role: 'user'
    };
    this.authService.register(newUser);
    alert('Registro Exitoso');
    this.router.navigate(['/login']);
  }
}
