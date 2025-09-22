import { ConfigService } from '../../config.service';

describe('Config service unit tests', () => {
  let sut: ConfigService;

  beforeEach(() => {
    sut = new ConfigService();
  });

  it('should be able to get config data', () => {
    const data = sut.getData();

    expect(data).toBeDefined();
  });

  it('should be able to get secret value', () => {
    const secretValue = sut.getValue('secret');

    expect(secretValue).toEqual('test');
  });
});
