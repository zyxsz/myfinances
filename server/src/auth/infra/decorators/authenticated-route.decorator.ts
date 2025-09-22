import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';

export const AuthenticatedRoute = () => {
  return applyDecorators(UseGuards(AuthGuard));
};
