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

  /**
   * Constructor of the NavbarComponent class
   * @param authService Service to handle authentication and authorization operations
   */
  constructor(private authService: AuthService) {}

  /**
   * OnInit lifecycle hook
   * Subscribes to the cart and user observables to update component state
   */
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

  /**
   * OnDestroy lifecycle hook
   * Unsubscribes from the cart and user observables to avoid memory leaks
   */
  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  /**
   * Logs the user out and updates the component state
   */
  logout(): void {
    this.authService.logout();
    this.loggedInUser = null;
  }
}
