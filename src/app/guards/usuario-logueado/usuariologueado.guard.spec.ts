import { TestBed } from '@angular/core/testing';

import { UsuariologueadoGuard } from './usuariologueado.guard';

describe('UsuariologueadoGuard', () => {
  let guard: UsuariologueadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuariologueadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
