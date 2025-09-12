import { Entity } from '@/shared/domain/entities/entity';
import { InMemoryRepository } from '../../in-memory.repository';

interface StubEntityProps {
  field1: string;
}

class SubEntity extends Entity<StubEntityProps> {
  public get field1() {
    return this.props.field1;
  }

  public set field1(v) {
    this.props.field1 = v;
  }
}

describe('In-memory repository unit tests', () => {
  let sut: InMemoryRepository<SubEntity, StubEntityProps>;

  beforeEach(() => {
    sut = new InMemoryRepository();
  });

  it('should be able to insert a entity in the repository', async () => {
    const entity = new SubEntity({ field1: 'entity1' });

    expect(async () => await sut.insert(entity)).resolves.not.toThrow();
    expect(sut.items[0]).toBeDefined();
    expect(sut.items[0].id).toEqual(entity.id);
  });

  it('should be able to update a entity in the repository', async () => {
    const entity = new SubEntity({ field1: 'entity1' });
    await sut.insert(entity);

    entity.field1 = '2';

    expect(async () => await sut.update(entity)).resolves.not.toThrow();

    expect(sut.items[0]).toBeDefined();
    expect(sut.items[0].id).toEqual(entity.id);
    expect(sut.items[0].field1).toEqual('2');
  });

  it('should be able to delete a entity from the repository', async () => {
    const entity = new SubEntity({ field1: 'entity1' });
    await sut.insert(entity);

    expect(async () => await sut.delete(entity)).resolves.not.toThrow();

    expect(sut.items[0]).toBeUndefined();
  });

  it('should be able to find a entity by id from the repository', async () => {
    const entity = new SubEntity({ field1: 'entity1' });
    const entity2 = new SubEntity({ field1: 'entity2' });

    await sut.insert(entity2);
    await sut.insert(entity);

    const result = await sut.findById(entity.id);

    expect(result).toBeDefined();
    expect(result.id).toEqual(entity.id);
    expect(result.field1).toEqual(entity.field1);
  });
});
