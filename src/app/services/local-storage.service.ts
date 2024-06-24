import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * Set an item in local storage.
   * @param {string} key - The key under which the value is stored.
   * @param {any} value - The value to be stored.
   */
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Get an item from local storage.
   * @template T
   * @param {string} key - The key of the item to retrieve.
   * @returns {T | null} - The retrieved item, or null if the key does not exist.
   */
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /**
   * Remove an item from local storage.
   * @param {string} key - The key of the item to remove.
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clear all items from local storage.
   */
  clear(): void {
    localStorage.clear();
  }
}
