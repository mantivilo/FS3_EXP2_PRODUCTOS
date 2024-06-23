import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  loggedInUser: any;
  cart: any[] = [];
  cartTotal: number = 0;
  cartCount: number = 0;
  private cartSubscription: Subscription | null = null;
  private userSubscription: Subscription | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.cartSubscription = this.authService.cart$.subscribe(cart => {
      this.cart = cart;
      this.cartTotal = cart.reduce((total, item) => total + item.price, 0);
      this.cartCount = cart.length;
    });

    this.userSubscription = this.authService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user;
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.loggedInUser = null;
  }
}
