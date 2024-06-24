import { Component, OnInit, OnDestroy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ligachilena',
  templateUrl: './ligachilena.component.html',
  styleUrls: ['./ligachilena.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [DecimalPipe]
})
export class LigaChilenaComponent implements OnInit, OnDestroy {
  products = [
    { id: 1, name: 'Colo Colo Local 2024', price: 53990, image: 'assets/images/colocoloLocal2024.webp' },
    { id: 2, name: 'Universidad Católica Local 2024', price: 50990, image: 'assets/images/ucLocal2024.webp' },
    { id: 3, name: 'Universidad de Chile Local 2024', price: 51990, image: 'assets/images/udechileLocal2024.webp' },
    { id: 4, name: 'Audax Italiano Local 2024', price: 42990, image: 'assets/images/audaxLocal2024.avif' },
    { id: 5, name: 'Palestino Local 2024', price: 45990, image: 'assets/images/palestinoLocal2024.png' },
    { id: 6, name: 'Unión Española Local 2024', price: 61990, image: 'assets/images/unionespaniolaLocal2024.avif' },
    { id: 7, name: 'Iquique Local 2024', price: 45990, image: 'assets/images/iquiqueLocal2024.png' },
    { id: 8, name: 'Cobreloa Local 2024', price: 49999, image: 'assets/images/cobreloaLocal2024.webp' },
    { id: 9, name: 'Copiapó Local 2024', price: 34900, image: 'assets/images/copiapoLocal2024.png' },
    { id: 10, name: 'Huachipato Local 2024', price: 48990, image: 'assets/images/huachipatoLocal2024.jpg' },
    { id: 11, name: 'Ohiggins Local 2024', price: 45000, image: 'assets/images/ohigginsLocal2024.jpg' },
    { id: 12, name: 'Everton Local 2024', price: 51990, image: 'assets/images/evertonLocal2024.webp' },
    { id: 13, name: 'Unión la Calera Local 2024', price: 40990, image: 'assets/images/unionlacaleraLocal2024.jpg' },
    { id: 14, name: 'Coquimbo Unido Local 2024', price: 51999, image: 'assets/images/coquimboLocal2024.avif' },
    { id: 15, name: 'Nublense Local 2024', price: 39900, image: 'assets/images/nublenseLocal2024.jpg' },
    { id: 16, name: 'Cobresal Local 2024', price: 47990, image: 'assets/images/cobresalLocal2024.jpg' },
  ];

  private cartSubscription: Subscription | null = null;

  constructor(private authService: AuthService, private decimalPipe: DecimalPipe) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  addToCart(product: any): void {
    const currentCart = this.authService.getCartValue();
    const updatedCart = [...currentCart, product];
    this.authService.updateCart(updatedCart);
  }

  formatPrice(price: number): string {
    return this.decimalPipe.transform(price, '1.0-0')?.replace(/,/g, '.') || '';
  }
}
