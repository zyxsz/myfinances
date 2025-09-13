export abstract class HashProvider {
  abstract compare(payload: string, hash: string): Promise<boolean>;
  abstract hash(payload: string): Promise<string>;
}
