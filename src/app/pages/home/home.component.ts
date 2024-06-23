import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [DecimalPipe]
})
export class HomeComponent implements OnInit {
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

  constructor(private localStorageService: LocalStorageService, private decimalPipe: DecimalPipe) {}

  ngOnInit(): void {}

  addToCart(product: any): void {
    let cart: any[] = this.localStorageService.getItem<any[]>('cart') || [];
    cart.push(product);
    this.localStorageService.setItem('cart', cart);
    alert(`${product.name} ha sido agregado al carrito.`);
  }

  formatPrice(price: number): string {
    return this.decimalPipe.transform(price, '1.0-0')?.replace(/,/g, '.') || '';
  }
}
