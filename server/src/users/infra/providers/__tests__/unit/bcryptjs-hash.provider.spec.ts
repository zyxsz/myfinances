import { BcryptJsHashProvider } from '../../bcryptjs-hash.provider';

describe('BcryptJs hash provider unit tests', () => {
  let sut: BcryptJsHashProvider;

  beforeEach(() => {
    sut = new BcryptJsHashProvider();
  });

  it('should be able to hash a payload', async () => {
    const payload = 'test';

    const response = await sut.hash(payload);

    expect(response).toBeDefined();
    expect(response).not.toEqual(payload);
  });

  it('should be able to compare a valid hash', async () => {
    const payload = 'test';
    const hash = '$2b$12$YQQrh93MjyX/V5AM.2PxeOU8WaqBptJUqvUIhRxul71I5LOdOGVLC';

    const response = await sut.compare(payload, hash);

    expect(response).toBeTruthy();
  });

  it("shouldn't be able to compare a invalid hash", async () => {
    const payload = 'test';
    const hash = '$2b$not_a_valid_hash';

    const response = await sut.compare(payload, hash);

    expect(response).toBeFalsy();
  });
});
