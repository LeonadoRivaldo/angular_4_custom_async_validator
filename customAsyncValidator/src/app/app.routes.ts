import { Routes } from "@angular/router";

import { UsuariosComponent } from './usuarios/usuarios.component';

export const ROUTES:Routes = [
  { path:"usuarios", component: UsuariosComponent },
  { path:"", component: UsuariosComponent  }
]
