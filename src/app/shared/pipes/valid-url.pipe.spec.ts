import { ValidURLPipe } from './valid-url.pipe';

describe('ValidURLPipe', () => {
  it('create an instance', () => {
    const pipe = new ValidURLPipe();
    expect(pipe).toBeTruthy();
  });
});
