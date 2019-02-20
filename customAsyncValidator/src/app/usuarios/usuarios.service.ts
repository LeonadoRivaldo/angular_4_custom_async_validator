import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UniqueValidator } from './usuarios.component';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService implements UniqueValidator{

  constructor(private http: Http){
  }

  validateUnique(prop:string, value:string, id:string){
    let url = `/usuarios/validate-unique/${prop}/${value}`;
    return this.http.post(`${environment.apiURl}${url}`, {id}).pipe(debounceTime(1000)).pipe((result)=>{ console.log(result); return result; });
  }

}
