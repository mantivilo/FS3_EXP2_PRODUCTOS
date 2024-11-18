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
    { id: 1, name: 'Promo Alto del Carmen 35', price: 7000, image: 'assets/images/promoAltoCarmen.png' },
    { id: 2, name: 'Ramazzotti 700 cc', price: 9990, image: 'assets/images/Ramazzotti.png' },
    { id: 3, name: 'Aperol 750 CC', price: 9500, image: 'assets/images/Aperol.png' },
    { id: 4, name: 'Whiskey Jack Daniels N7 750 CC', price: 22360, image: 'assets/images/JackDaniels7.png' },
    { id: 5, name: 'Jagermeister 700 CC', price: 12000, image: 'assets/images/Jagermeister.png' },
    { id: 6, name: 'Vino Santa Helena Blanco 2Lt', price: 3500, image: 'assets/images/VinoSantaHelena.png' },
    { id: 7, name: 'Espumante Vinamar Brut 750 CC', price: 4500, image: 'assets/images/EspumanteVinaBrut.png' },
    { id: 8, name: 'Vodka Absolut Blue Botella 750cc', price: 11500, image: 'assets/images/VodkaAbsolut.png' },
    { id: 9, name: 'Sangria Lola Botella 750cc', price: 55990, image: 'assets/images/SangriaLola.png' }
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
