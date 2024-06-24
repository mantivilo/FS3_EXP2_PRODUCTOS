import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * AdminComponent is responsible for the admin dashboard functionality.
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AdminComponent {

  /**
   * Handles the action to add a product.
   */
  addProduct(): void {
    // Implement functionality to add a product
    alert('Agregar Producto');
  }

  /**
   * Handles the action to edit a product.
   */
  editProduct(): void {
    // Implement functionality to edit a product
    alert('Editar Producto');
  }

  /**
   * Handles the action to delete a product.
   */
  deleteProduct(): void {
    // Implement functionality to delete a product
    alert('Eliminar Producto');
  }

  /**
   * Handles the action to add a user.
   */
  addUser(): void {
    // Implement functionality to add a user
    alert('Agregar Usuario');
  }

  /**
   * Handles the action to edit a user.
   */
  editUser(): void {
    // Implement functionality to edit a user
    alert('Editar Usuario');
  }

  /**
   * Handles the action to delete a user.
   */
  deleteUser(): void {
    // Implement functionality to delete a user
    alert('Eliminar Usuario');
  }
}
