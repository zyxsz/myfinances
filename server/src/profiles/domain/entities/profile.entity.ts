import { Entity as BaseEntity } from '@/shared/domain/entities/entity';
import type { Optional } from '@/shared/types/optional';
import {
  ProfileValidatorFactory,
  type ProfileValidator,
} from '../validators/profile.validator';

export namespace Profile {
  export type ProfileType = 'PF' | 'PJ';

  export interface Props {
    userId: string;

    name: string;
    document: string | null;
    type: ProfileType;

    updatedAt: Date;
    createdAt: Date;
  }

  export class Entity extends BaseEntity<Props> {
    private validator: ProfileValidator;

    constructor(props: Props, id?: string) {
      const validator = ProfileValidatorFactory.create();
      validator.validate(props);

      super(props, id);
      this.validator = validator;
    }

    public get userId() {
      return this.props.userId;
    }

    public get name() {
      return this.props.name;
    }

    public get document() {
      return this.props.document;
    }

    public get type() {
      return this.props.type;
    }

    public get updatedAt() {
      return this.props.updatedAt;
    }

    public get createdAt() {
      return this.props.createdAt;
    }

    public set userId(v) {
      this.validate({ ...this.props, userId: v });
      this.props.userId = v;
    }

    public set name(v) {
      this.validate({ ...this.props, name: v });
      this.props.name = v;
    }

    public set document(v) {
      this.validate({ ...this.props, document: v });
      this.props.document = v;
    }

    public set type(v) {
      this.validate({ ...this.props, type: v });
      this.props.type = v;
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
