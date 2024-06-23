import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private cartSubject = new BehaviorSubject<any[]>(this.localStorageService.getItem<any[]>('cart') || []);
  cart$ = this.cartSubject.asObservable();

  private loggedInUserSubject = new BehaviorSubject<any>(this.localStorageService.getItem('loggedInUser'));
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor(private localStorageService: LocalStorageService, private router: Router) {
    this.initializeAdmin();
  }

  initializeAdmin(): void {
    let users: any[] = this.localStorageService.getItem<any[]>('users') || [];
    if (!users.find(user => user.username === 'admin')) {
      users.push({ username: 'admin', name: 'Admin', password: 'admin123', email: 'admin@example.com', phone: '0000000000', role: 'admin' });
      this.localStorageService.setItem('users', users);
    }
  }

  login(username: string, password: string): boolean {
    const users: any[] = this.localStorageService.getItem<any[]>('users') || [];
    const user = users.find((u: any) => u.username === username && u.password === password);
    if (user) {
      this.localStorageService.setItem('loggedInUser', user);
      this.loggedInUserSubject.next(user);
      return true;
    }
    return false;
  }

  logout(): void {
    this.localStorageService.removeItem('loggedInUser');
    this.loggedInUserSubject.next(null);
    this.router.navigate(['/']);
  }

  getLoggedInUser(): any {
    return this.localStorageService.getItem('loggedInUser');
  }

  register(user: any): void {
    const users: any[] = this.localStorageService.getItem<any[]>('users') || [];
    users.push(user);
    this.localStorageService.setItem('users', users);
  }

  updateCart(cart: any[]): void {
    this.localStorageService.setItem('cart', cart);
    this.cartSubject.next(cart);
  }

  getCartValue(): any[] {
    return this.cartSubject.value;
  }

  getCartTotal(): number {
    return this.cartSubject.value.reduce((total, item) => total + item.price, 0);
  }
}
