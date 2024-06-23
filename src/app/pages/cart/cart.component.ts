import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.cart = this.localStorageService.getItem('cart') || [];
    this.updateCartTotal();
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
    this.localStorageService.setItem('cart', this.cart);
    this.updateCartTotal();
  }

  emptyCart(): void {
    this.localStorageService.removeItem('cart');
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
}
