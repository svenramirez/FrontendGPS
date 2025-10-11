import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TokenService } from '../../core/services/token.service';
import { apiConstants } from '../../core/constants/api.constants';
import { User } from '../../core/types/user.type';


interface LoginResponse {
  token: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private readonly _http: HttpClient, private readonly _tokenService: TokenService) { }

    login(username: string, password: string): Observable<User> {
       return this._http.post<LoginResponse>(`${apiConstants.BASE_URL}${apiConstants.LOGIN}`, { code: username, password })
         .pipe(
           map((response: { token: string; }) => {
             this._tokenService.setToken(response.token);
             return this._tokenService.decodeToken(response.token);
           })
         );
    }


}