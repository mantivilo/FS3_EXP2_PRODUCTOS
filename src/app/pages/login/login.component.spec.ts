import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ElementRef } from '@angular/core';

declare var bootstrap: any;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['login', 'getLoggedInUser']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule, RouterModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should show an alert if fields are empty', () => {
      spyOn(window, 'alert');
      component.username = '';
      component.password = '';
      component.onSubmit();
      expect(window.alert).toHaveBeenCalledWith('Por favor, completa todos los campos.');
    });

    it('should show an alert if login fails', () => {
      spyOn(window, 'alert');
      component.username = 'test';
      component.password = 'wrongpassword';
      authServiceSpy.login.and.returnValue(false);
      component.onSubmit();
      expect(window.alert).toHaveBeenCalledWith('Usuario o Contraseña Invalida');
    });

    it('should navigate to admin page if login succeeds and user is admin', () => {
      component.username = 'admin';
      component.password = 'password';
      authServiceSpy.login.and.returnValue(true);
      authServiceSpy.getLoggedInUser.and.returnValue({ role: 'admin' });
      component.onSubmit();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin']);
    });

    it('should navigate to home page if login succeeds and user is not admin', () => {
      component.username = 'user';
      component.password = 'password';
      authServiceSpy.login.and.returnValue(true);
      authServiceSpy.getLoggedInUser.and.returnValue({ role: 'user' });
      component.onSubmit();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('onRecover', () => {
    it('should not show alert if email is invalid', () => {
      spyOn(window, 'alert');
      component.recoverEmail = 'invalidemail';
      spyOn(component, 'validateEmail').and.returnValue(false);
      component.onRecover();
      expect(window.alert).not.toHaveBeenCalled();
    });

    it('should show alert and hide modal if email is valid', () => {
      spyOn(window, 'alert');
      component.recoverEmail = 'test@example.com';
      spyOn(component, 'validateEmail').and.returnValue(true);

      // Mock bootstrap Modal
      const mockModalInstance = {
        hide: jasmine.createSpy('hide'),
      };
      spyOn(bootstrap, 'Modal').and.returnValue(mockModalInstance);

      component.recoverModal = {
        nativeElement: {},
      } as ElementRef;

      component.onRecover();

      expect(window.alert).toHaveBeenCalledWith(
        'Las instrucciones para recuperar la contraseña han sido enviadas a su correo.'
      );
      expect(mockModalInstance.hide).toHaveBeenCalled();
    });
  });

  describe('validateEmail', () => {
    it('should return true for valid email', () => {
      const result = component.validateEmail('test@example.com');
      expect(result).toBeTrue();
    });

    it('should return false for invalid email', () => {
      const result = component.validateEmail('invalid-email');
      expect(result).toBeFalse();
    });
  });
});
