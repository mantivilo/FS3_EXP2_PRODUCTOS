import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedInUser: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  logout(): void {
    this.authService.logout();
    this.loggedInUser = null;
  }
}
