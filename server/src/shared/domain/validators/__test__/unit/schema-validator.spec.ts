import z from 'zod';
import { SchemaValidator } from '../../schema-validator';
import { ValidationError } from '@/shared/domain/errors/validation.error';

describe('Schema validator unit tests', () => {
  let sut: SchemaValidator;

  const schema = z.object({
    field1: z.string().min(1).max(12),
    field2: z.number(),
  });

  beforeEach(() => {
    sut = new SchemaValidator();
  });

  it('should be able to validate a schema with valid data', () => {
    const data = { field1: 'asd', field2: 2 };

    const result = sut.validateSchema(data, schema);

    expect(result).toBeTruthy();
    expect(result).toStrictEqual(data);
  });

  it('should throw while validating a schema with invalid data', () => {
    const data = { field1: 2, field2: 'das' };

    expect(() => sut.validateSchema(data, schema)).toThrow(ValidationError);
  });
});
