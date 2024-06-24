import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const localStorageSpy = jasmine.createSpyObj('LocalStorageService', ['getItem', 'setItem', 'removeItem']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: LocalStorageService, useValue: localStorageSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize admin user if not present', () => {
    localStorageService.getItem.and.returnValue(null);
    service.initializeAdmin();
    expect(localStorageService.setItem).toHaveBeenCalled();
  });

  it('should login a user with valid credentials', () => {
    const mockUser = { username: 'test', password: 'test123' };
    localStorageService.getItem.and.returnValue([mockUser]);

    expect(service.login('test', 'test123')).toBeTrue();
    expect(localStorageService.setItem).toHaveBeenCalledWith('loggedInUser', mockUser);
  });

  it('should not login a user with invalid credentials', () => {
    const mockUser = { username: 'test', password: 'test123' };
    localStorageService.getItem.and.returnValue([mockUser]);

    expect(service.login('test', 'wrongpassword')).toBeFalse();
    expect(localStorageService.setItem).not.toHaveBeenCalledWith('loggedInUser', mockUser);
  });

  it('should logout the user', () => {
    service.logout();
    expect(localStorageService.removeItem).toHaveBeenCalledWith('loggedInUser');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
