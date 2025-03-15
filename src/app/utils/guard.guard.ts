import { CanDeactivateFn, Router } from '@angular/router';
import { GuardService } from '../services/guard.service';

export const guardGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const authGuardService = new GuardService(new Router)
  return authGuardService.canDeactivate();
};