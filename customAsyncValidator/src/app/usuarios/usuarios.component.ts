import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { UsuariosService } from './usuarios.service';
import { map, catchError, debounceTime } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';

export interface UniqueValidator{
  validateUnique(prop:string, value:string, id:string);
}

@Injectable({
  providedIn: 'root'
})
export class UniqueValidate implements AsyncValidator {
  validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
    return null;
  }

  static createValidator(prop:string, id:string, msg:string, reqService: UniqueValidator) {
    return (control: AbstractControl) => {
      if(!control.value){
        return new Promise((r,rj)=>r(null));
      }

      return reqService.validateUnique(prop, control.value, id).pipe(
        map(res => {
          if(res['status'] == 200){
            let body = JSON.parse(res['_body']);
            if(body.isNotUnique){
              return { unique: { isNotUnique:body.isNotUnique, errorMsg: msg } };
            }else{
              return null
            }
          }else{
            return null;
          }
        })
      );
    };
  }
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  userform: any;




  constructor(private fb:FormBuilder, private usuariosService:UsuariosService, private uniquevalidate:UniqueValidate) { }

  ngOnInit() {
    this.userform = this.fb.group({
      email:this.fb.control("", [], UniqueValidate.createValidator(
        'email',
        null,
        "Email não é unico.",
        this.usuariosService
      )),
      login:this.fb.control("", [], UniqueValidate.createValidator(
        'login',
        null,
        "login não é unico.",
        this.usuariosService
      ))
    })
  }

}
