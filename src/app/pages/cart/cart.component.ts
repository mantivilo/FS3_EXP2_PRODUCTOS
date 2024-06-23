import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  cartTotal = 0;

  constructor(private localStorageService: LocalStorageService, private authService: AuthService) {}

  ngOnInit(): void {
    this.cart = this.authService.getCartValue();
    this.updateCartTotal();
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
    this.authService.updateCart(this.cart);
    this.updateCartTotal();
  }

  emptyCart(): void {
    this.authService.updateCart([]);
    this.cart = [];
    this.updateCartTotal();
  }

  pay(): void {
    alert('Su pago ha sido procesado correctamente');
    this.emptyCart();
  }

  updateCartTotal(): void {
    this.cartTotal = this.cart.reduce((sum, product) => sum + product.price, 0);
  }

  formatPrice(price: number): string {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
