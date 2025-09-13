import type { Entity } from '../entities/entity';
import { NotFoundError } from '../errors/not-found.error';
import { Repository } from './repository';

export class InMemoryRepository<E extends Entity<P>, P> extends Repository<
  E,
  P
> {
  public items: E[] = [];

  async findById(id: string): Promise<E> {
    const item = this.items.find((e) => e.id === id);

    if (!item)
      throw new NotFoundError('Item not found in in-memory repository');

    return item;
  }

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async update(entity: E): Promise<void> {
    this.items = this.items.map((e) => (e.id === entity.id ? entity : e));
  }

  async delete(entity: E): Promise<void> {
    this.items = this.items.filter((e) => e.id !== entity.id);
  }
}
