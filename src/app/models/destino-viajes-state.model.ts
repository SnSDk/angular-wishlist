import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions , Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoViaje } from './destino-viaje.models';

//ESTADO
export interface DestinoViajesState {
    items: DestinoViaje[],
    loading: boolean,
    favorito: DestinoViaje
}

export const inicializaDestinoViajesState = function() {
    return { 
        items: [],
        loading: false,
        favorito: null
     };
};

//ACCIONES
export enum DestinoViajesActionTypes {
    NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
    ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito'
}

export class NuevoDestinoAction implements Action {
    type = DestinoViajesActionTypes.NUEVO_DESTINO;
    constructor (public destino: DestinoViaje)   {   }
}

export class ElegidoFavoritoAction implements Action {
    type = DestinoViajesActionTypes.ELEGIDO_FAVORITO;

    constructor (public destino: DestinoViaje) { }
}

export type DestinoViajesActions = NuevoDestinoAction | ElegidoFavoritoAction;

export function reducerDestinosViajes ( state: DestinoViajesState, action: DestinoViajesActions): DestinoViajesState {
  switch (action.type) {
      case DestinoViajesActionTypes.NUEVO_DESTINO :{
          return {...state, items : [...state.items, action as NuevoDestinoAction).destino]}
      };
      case DestinoViajesActionTypes.ELEGIDO_FAVORITO :{
          state.items.forEach(x => x.setSelected(false));
          const fav: DestinoViaje = (action as ElegidoFavoritoAction).destino;
          fav.setSelected(true);
          return {...state , favorito: fav};
      }
  }
}

//EFFECTS
@Injectable()
export class DestinoViajesEffects {
    @Effect()
    nuevoAgregado$: Observable<Action> = this.action$.pipe(
        ofType(DestinoViajesActionTypes.NUEVO_DESTINO),
        map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
    );

    constructor(private action$: Actions) {}
}
