import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'la-camiseta-store';

  hiddenFooterRoutes = ['/cart', '/register', '/login' , '/admin'];

  constructor(private router: Router) {}

  shouldHideFooter(): boolean {
    return this.hiddenFooterRoutes.includes(this.router.url);
  }
}
