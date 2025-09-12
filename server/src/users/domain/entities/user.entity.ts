import { Entity as BaseEntity } from 'src/shared/domain/entities/entity';

export namespace User {
  export interface Props {
    nickname: string | null;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }

  export class Entity extends BaseEntity<Props> {}
}
