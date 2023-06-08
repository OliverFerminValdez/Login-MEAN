import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth.interfaces';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  constructor(private http: HttpClient) { }

  get usuario(){
    return {...this._usuario};
  }
  
  loginUser(email: string, password: string){
    
    const url = `${this.baseUrl}/auth`;
    const body = {email, password};

    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap(resp =>{
          if(resp.ok){
            
            localStorage.setItem('token',resp.token!)
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!
            }
          }
        }),
        map(res => res.ok),
        catchError(err => of(err.error.msg))
      )
  }
  registerUser(name: string, email: string, password: string){

      const url = `${this.baseUrl}/auth/new`
      const body = {name, email, password};

      return this.http.post<AuthResponse>(url,body)
        .pipe(
          tap(resp => {
            if(resp.ok){
              localStorage.setItem('token',resp.token!)
              this._usuario = {
                name: resp.name!,
                uid: resp.uid!
              }

            }
          }),
          map(res => res.ok),
          catchError(err => of(err.error.msg)
          ))
  }

  validarToken(): Observable<boolean> {

    const url = `${ this.baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );
    return this.http.get<AuthResponse>( url, { headers } )
        .pipe(
          map( resp => {
            localStorage.setItem('token', localStorage.getItem('token') || '');
            this._usuario = { 
              name: resp.name!,
              uid: resp.uid!
            }
            return resp.ok;
          }),
          catchError( err => of(false) )
        );

  }

  logout(){
    localStorage.clear();
  }

}
