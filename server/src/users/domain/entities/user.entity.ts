import { Entity as BaseEntity } from '@/shared/domain/entities/entity';
import {
  UserValidatorFactory,
  type UserValidator,
} from '../validators/user.validator';
import type { Optional } from '@/shared/types/optional';

export namespace User {
  export interface Props {
    nickname: string | null;
    email: string;
    firstName: string;
    lastName: string;
    password: string;

    updatedAt: Date;
    createdAt: Date;
  }

  export class Entity extends BaseEntity<Props> {
    private validator: UserValidator;

    constructor(props: Props, id?: string) {
      super(props, id);

      this.validator = UserValidatorFactory.create();
      this.validate(props);
    }

    public get nickname() {
      return this.props.nickname;
    }

    public get email() {
      return this.props.email;
    }

    public get firstName() {
      return this.props.firstName;
    }

    public get lastName() {
      return this.props.lastName;
    }

    public get password() {
      return this.props.password;
    }

    public get updatedAt() {
      return this.props.updatedAt;
    }
    public get createdAt() {
      return this.props.createdAt;
    }

    public set nickname(v) {
      this.validate({ ...this.props, nickname: v });

      this.props.nickname = v;
    }

    public set firstName(v) {
      this.validate({ ...this.props, firstName: v });

      this.props.firstName = v;
    }

    public set lastName(v) {
      this.validate({ ...this.props, lastName: v });

      this.props.lastName = v;
    }

    public set email(v) {
      this.validate({ ...this.props, email: v });

      this.props.email = v;
    }

    public set password(v) {
      this.validate({ ...this.props, password: v });

      this.props.password = v;
    }

    static create(
      props: Optional<Props, 'updatedAt' | 'createdAt'>,
      id?: string,
    ) {
      return new Entity(
        {
          ...props,
          updatedAt: props.updatedAt ?? new Date(),
          createdAt: props.createdAt ?? new Date(),
        },
        id,
      );
    }

    public validate(props: Props) {
      this.validator.validate(props);
    }
  }
}
