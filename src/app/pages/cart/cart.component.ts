import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * Component representing the shopping cart.
 */
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CartComponent implements OnInit {
  /**
   * Array holding the cart items.
   */
  cart: any[] = [];

  /**
   * Total price of the cart items.
   */
  cartTotal = 0;

  /**
   * Creates an instance of CartComponent.
   * @param localStorageService - Service to handle local storage operations.
   * @param authService - Service to handle authentication-related operations.
   * @param router - Router service for navigation.
   */
  constructor(
    private localStorageService: LocalStorageService, 
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {
    this.cart = this.authService.getCartValue();
    this.updateCartTotal();
  }

  /**
   * Removes an item from the cart.
   * @param index - Index of the item to be removed.
   */
  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
    this.authService.updateCart(this.cart);
    this.updateCartTotal();
  }

  /**
   * Empties the cart.
   */
  emptyCart(): void {
    this.authService.updateCart([]);
    this.cart = [];
    this.updateCartTotal();
  }

  /**
   * Processes the payment and empties the cart, then redirects to the home page.
   */
  pay(): void {
    alert('Su pago ha sido procesado correctamente');
    this.emptyCart();
    this.router.navigate(['/']);
  }

  /**
   * Updates the total price of the cart items.
   */
  updateCartTotal(): void {
    this.cartTotal = this.cart.reduce((sum, product) => sum + product.price, 0);
  }

  /**
   * Formats the price to a string with thousand separators.
   * @param price - Price to format.
   * @returns Formatted price string.
   */
  formatPrice(price: number): string {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
