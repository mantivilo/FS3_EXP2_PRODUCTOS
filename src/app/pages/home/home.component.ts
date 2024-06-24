import { Component, OnInit, OnDestroy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

/**
 * HomeComponent displays the home page with a list of products.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [DecimalPipe]
})
export class HomeComponent implements OnInit, OnDestroy {
  /** Array of products available on the home page */
  products = [
    { id: 1, name: 'Colo Colo Local 2024', price: 53990, image: 'assets/images/colocoloLocal2024.webp' },
    { id: 2, name: 'Manchester City Local 2024', price: 54990, image: 'assets/images/manchestercityLocal2024.webp' },
    { id: 3, name: 'Manchester City Visita 2024', price: 56000, image: 'assets/images/manchestercityVisita2024.jpg' },
    { id: 4, name: 'Boca Juniors Local 2024', price: 55990, image: 'assets/images/bocajuniorsLocal2024.webp' },
    { id: 5, name: 'River Plate Local 2024', price: 54990, image: 'assets/images/riverplateLocal2024.webp' },
    { id: 6, name: 'PSG Local 2024', price: 53990, image: 'assets/images/psgLocal2024.webp' },
    { id: 7, name: 'Real Madrid Local 2024', price: 60990, image: 'assets/images/realmadridLocal2024.webp' },
    { id: 8, name: 'Inter de Milán Local 2024', price: 70000, image: 'assets/images/intermilanLocal2024.webp' },
    { id: 9, name: 'Inter de Miami Local 2024', price: 55990, image: 'assets/images/intermiamiLocal2024.webp' }
  ];

  /** Subscription to the cart observable */
  private cartSubscription: Subscription | null = null;

  /**
   * Constructor for the HomeComponent.
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
