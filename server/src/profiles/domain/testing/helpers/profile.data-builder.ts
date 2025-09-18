import { randomUUID } from 'node:crypto';
import type { Profile } from '../../entities/profile.entity';

export class ProfileDataBuilder {
  static build(props?: Partial<Profile.Props>) {
    return {
      name: props?.name ?? 'PF',
      document: props?.document ?? '00000000000',
      type: props?.type ?? 'PF',
      userId: props?.userId ?? randomUUID(),
      createdAt: props?.createdAt ?? new Date(),
      updatedAt: props?.updatedAt ?? new Date(),
    } satisfies Profile.Props;
  }
}
