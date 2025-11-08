
export type ReleaseType = 'INCOME' | 'OUTCOME' | 'INVESTMENT';

export interface Release {
  id: string;
  profileId: string;

  name: string;
  description: string | null;

  valueInCents: number;
  type: ReleaseType;

  madeAt: string | null;
  updatedAt: string;
  createdAt: string;
}

export type ReleasePeriod = 30 | 60 | 90 | 180 | undefined