import { Injectable } from '@angular/core';
import { User } from '../types/user.type';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly TOKEN_KEY = 'token';

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  clear(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  decodeToken(token: string): User {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return {
      role: decoded.role,
      id: decoded.code,
      name: decoded.name,
    };
  }
}
