import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DecimalPipe } from '@angular/common';
import { HomeComponent } from './home.component';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['getCartValue', 'updateCart']);
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        DecimalPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize without errors', () => {
      expect(() => component.ngOnInit()).not.toThrow();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from cartSubscription if it exists', () => {
      const unsubscribeSpy = jasmine.createSpy('unsubscribe');
      component['cartSubscription'] = { unsubscribe: unsubscribeSpy } as unknown as Subscription;
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalled();
    });

    it('should not throw an error if cartSubscription is null', () => {
      component['cartSubscription'] = null;
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('addToCart', () => {
    it('should add a product to the cart', () => {
      const product = { id: 1, name: 'Promo Alto del Carmen', price: 7000 };
      const currentCart = [{ id: 2, name: 'Ramazzotti', price: 9990 }];
      const updatedCart = [...currentCart, product];

      authServiceSpy.getCartValue.and.returnValue(currentCart);
      authServiceSpy.updateCart.and.stub();

      component.addToCart(product);

      expect(authServiceSpy.getCartValue).toHaveBeenCalled();
      expect(authServiceSpy.updateCart).toHaveBeenCalledWith(updatedCart);
    });
  });

  describe('formatPrice', () => {
    it('should format the price with thousands separators', () => {
      const price = 22360;
      const formattedPrice = component.formatPrice(price);
      expect(formattedPrice).toBe('22.360');
    });

    it('should return an empty string if the price is invalid', () => {
      const formattedPrice = component.formatPrice(null as unknown as number);
      expect(formattedPrice).toBe('');
    });
  });
});
