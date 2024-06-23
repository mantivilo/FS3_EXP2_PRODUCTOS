import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const loggedInUser = this.authService.getLoggedInUser();
    if (!loggedInUser || loggedInUser.role !== 'admin') {
      alert('Acceso denegado');
      window.location.href = '/';
    }
  }
}
