import { Entity as BaseEntity } from '@/shared/domain/entities/entity';
import {
  ReleaseValidatorFactory,
  type ReleaseValidator,
} from '../validators/release.validator';
import type { Optional } from '@/shared/types/optional';

export namespace Release {
  export type Type = 'INCOME' | 'OUTCOME' | 'INVESTMENT';

  export interface Props {
    profileId: string;

    name: string;
    description: string | null;

    valueInCents: number;
    type: Type;

    madeAt: Date | null;
    updatedAt: Date;
    createdAt: Date;
  }

  export class Entity extends BaseEntity<Props> {
    private validator: ReleaseValidator;

    constructor(props: Props, id?: string) {
      const validator = ReleaseValidatorFactory.create();
      validator.validate(props);

      super(props, id);

      this.validator = validator;
    }

    public get profileId() {
      return this.props.profileId;
    }
    public get name() {
      return this.props.name;
    }
    public get description() {
      return this.props.description;
    }
    public get valueInCents() {
      return this.props.valueInCents;
    }
    public get type() {
      return this.props.type;
    }
    public get madeAt() {
      return this.props.madeAt;
    }
    public get updatedAt() {
      return this.props.updatedAt;
    }
    public get createdAt() {
      return this.props.createdAt;
    }

    public set name(v) {
      this.validate({ ...this.props, name: v });

      if (this.props.name !== v) this.props.updatedAt = new Date();
      this.props.name = v;
    }

    public set description(v) {
      this.validate({ ...this.props, description: v });

      if (this.props.description !== v) this.props.updatedAt = new Date();
      this.props.description = v;
    }

    public set valueInCents(v) {
      this.validate({ ...this.props, valueInCents: v });

      if (this.props.valueInCents !== v) this.props.updatedAt = new Date();
      this.props.valueInCents = v;
    }
    public set type(v) {
      this.validate({ ...this.props, type: v });

      if (this.props.type !== v) this.props.updatedAt = new Date();
      this.props.type = v;
    }
    public set madeAt(v) {
      this.validate({ ...this.props, madeAt: v });

      if (this.props.madeAt !== v) this.props.updatedAt = new Date();
      this.props.madeAt = v;
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
