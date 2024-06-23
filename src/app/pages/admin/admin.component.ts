import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AdminComponent {
  addProduct() {
    // Implement functionality to add a product
    alert('Agregar Producto');
  }

  editProduct() {
    // Implement functionality to edit a product
    alert('Editar Producto');
  }

  deleteProduct() {
    // Implement functionality to delete a product
    alert('Eliminar Producto');
  }

  addUser() {
    // Implement functionality to add a user
    alert('Agregar Usuario');
  }

  editUser() {
    // Implement functionality to edit a user
    alert('Editar Usuario');
  }

  deleteUser() {
    // Implement functionality to delete a user
    alert('Eliminar Usuario');
  }
}
