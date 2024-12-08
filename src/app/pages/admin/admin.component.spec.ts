import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  it('deberia llamar addProduct y mostrar alerta', () => {
    spyOn(window, 'alert');
    component.addProduct();
    expect(window.alert).toHaveBeenCalledWith('Agregar Producto');
  });

  it('should call editProduct and show alert', () => {
    spyOn(window, 'alert');
    component.editProduct();
    expect(window.alert).toHaveBeenCalledWith('Editar Producto');
  });

  it('should call deleteProduct and show alert', () => {
    spyOn(window, 'alert');
    component.deleteProduct();
    expect(window.alert).toHaveBeenCalledWith('Eliminar Producto');
  });

  it('should call addUser and show alert', () => {
    spyOn(window, 'alert');
    component.addUser();
    expect(window.alert).toHaveBeenCalledWith('Agregar Usuario');
  });

  it('should call editUser and show alert', () => {
    spyOn(window, 'alert');
    component.editUser();
    expect(window.alert).toHaveBeenCalledWith('Editar Usuario');
  });

  it('should call deleteUser and show alert', () => {
    spyOn(window, 'alert');
    component.deleteUser();
    expect(window.alert).toHaveBeenCalledWith('Eliminar Usuario');
  });
});
