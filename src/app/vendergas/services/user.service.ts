import { Injectable } from '@angular/core';
import { User } from '../models';
import { ApiServices } from './api.services';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private apiServices: ApiServices) { }
    // NOTE: Criar usuário
    registerUser(user: User): Observable<User> {
        return this.apiServices.set(user, "user")
    }
    
    // NOTE: Fazer login
    loginUser(user: User): Observable<User> {
        return this.apiServices.login(user, "login")
    }
}
