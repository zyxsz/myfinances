export type ReleasePeriod = 30 | 60 | 90 | 180 | undefined;

export interface ReleasePeriodRange {
  range: {
    startAt: Date;
    endAt: Date;
  }
}