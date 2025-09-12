import type { Entity } from '../entities/entity';

export abstract class Repository<E extends Entity<P>, P> {
  abstract findById(id: string): Promise<E>;
  abstract insert(entity: E): Promise<void>;
  abstract update(entity: E): Promise<void>;
  abstract delete(entity: E): Promise<void>;
}
