import { randomUUID } from 'node:crypto';
import type { Release } from '../../entities/release.entity';

export class ReleaseDataBuilder {
  static build(props?: Partial<Release.Props>) {
    return {
      profileId: props?.profileId ?? randomUUID(),
      name: props?.name ?? 'test01',
      description: props?.description ?? null,
      madeAt: props?.madeAt ?? new Date(),
      type: props?.type ?? 'INCOME',
      valueInCents: props?.valueInCents ?? 2,
      createdAt: props?.createdAt ?? new Date(),
      updatedAt: props?.updatedAt ?? new Date(),
    } satisfies Release.Props;
  }
}
