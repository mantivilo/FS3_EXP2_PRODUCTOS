import { Component, OnInit, OnDestroy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

/**
 * LigaChilenaComponent displays products from the Chilean football league.
 */
@Component({
  selector: 'app-cervezas',
  templateUrl: './cervezas.component.html',
  styleUrls: ['./cervezas.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [DecimalPipe]
})
export class CervezasComponent implements OnInit, OnDestroy {
  /** Array of products available in the Liga Chilena */
  products = [
    { id: 1, name: 'Cusquena 473 CC x 24', price: 18800, image: 'assets/images/cusquena.png' },
    { id: 2, name: 'Stella Artois 473 CC x24', price: 19900, image: 'assets/images/Stella.png' },
    { id: 3, name: 'Quilmes 473 CC x24', price: 17000, image: 'assets/images/Quilmes.png' },
    { id: 4, name: 'Becker 473 CC x6', price: 4000, image: 'assets/images/Becker.png' },
    { id: 5, name: 'Corona 330 CC x24', price: 21500, image: 'assets/images/corona.png' },
    { id: 6, name: 'Kross Golden Ale 330cc x12', price: 16700, image: 'assets/images/kross.png' },
    { id: 7, name: 'Patagonia RedLager 470 CC x6', price: 5900, image: 'assets/images/patagonia.png' },
    { id: 8, name: 'Escudo Silver lata 470 CC x12', price: 7990, image: 'assets/images/escudo.png' },
    { id: 9, name: 'Royal Guard lata 470 CC x24', price: 21500, image: 'assets/images/royal.png' }
  ];

  /** Subscription to the cart observable */
  private cartSubscription: Subscription | null = null;

  /**
   * Constructor for the LigaChilenaComponent.
   * @param authService - Service to handle authentication and cart updates.
   * @param decimalPipe - Pipe to format numbers.
   */
  constructor(private authService: AuthService, private decimalPipe: DecimalPipe) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {}

  /**
   * Cleans up any subscriptions when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  /**
   * Adds a product to the cart.
   * @param product - The product to add to the cart.
   */
  addToCart(product: any): void {
    const currentCart = this.authService.getCartValue();
    const updatedCart = [...currentCart, product];
    this.authService.updateCart(updatedCart);
  }

  /**
   * Formats the price to a string with no decimal places and thousands separators.
   * @param price - The price to format.
   * @returns The formatted price.
   */
  formatPrice(price: number): string {
    return this.decimalPipe.transform(price, '1.0-0')?.replace(/,/g, '.') || '';
  }
}
