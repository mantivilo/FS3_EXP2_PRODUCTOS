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

  /**
   * AuthService constructor
   * @param {LocalStorageService} localStorageService - Service to handle local storage operations.
   * @param {Router} router - Router service for navigation.
   */
  constructor(private localStorageService: LocalStorageService, private router: Router) {
    this.initializeAdmin();
  }

  /**
   * Initialize admin user if not present in local storage.
   */
  initializeAdmin(): void {
    let users: any[] = this.localStorageService.getItem<any[]>('users') || [];
    if (!users.find(user => user.username === 'admin')) {
      users.push({ username: 'admin', name: 'Admin', password: 'admin123', email: 'admin@example.com', phone: '0000000000', role: 'admin' });
      this.localStorageService.setItem('users', users);
    }
  }

  /**
   * Log in a user.
   * @param {string} username - Username of the user.
   * @param {string} password - Password of the user.
   * @returns {boolean} - Returns true if login is successful, false otherwise.
   */
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

  /**
   * Log out the current user.
   */
  logout(): void {
    this.localStorageService.removeItem('loggedInUser');
    this.loggedInUserSubject.next(null);
    this.router.navigate(['/']);
  }

  /**
   * Get the currently logged-in user.
   * @returns {any} - The currently logged-in user.
   */
  getLoggedInUser(): any {
    return this.localStorageService.getItem('loggedInUser');
  }

  /**
   * Register a new user.
   * @param {any} user - The user object containing user details.
   */
  register(user: any): void {
    const users: any[] = this.localStorageService.getItem<any[]>('users') || [];
    users.push(user);
    this.localStorageService.setItem('users', users);
  }

  /**
   * Update the cart with new items.
   * @param {any[]} cart - Array of items to be updated in the cart.
   */
  updateCart(cart: any[]): void {
    this.localStorageService.setItem('cart', cart);
    this.cartSubject.next(cart);
  }

  /**
   * Get the current value of the cart.
   * @returns {any[]} - Array of items in the cart.
   */
  getCartValue(): any[] {
    return this.cartSubject.value;
  }

  /**
   * Get the total value of the cart.
   * @returns {number} - Total price of items in the cart.
   */
  getCartTotal(): number {
    return this.cartSubject.value.reduce((total, item) => total + item.price, 0);
  }
}
