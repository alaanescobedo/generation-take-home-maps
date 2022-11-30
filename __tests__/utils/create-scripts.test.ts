import { createScript } from '../../src/utils/create-scripts';

describe('createScript - Google', () => {
  it('should return a script', () => {
    const script = createScript({ apiKey: 'test' });

    expect(script).toEqual(expect.any(HTMLScriptElement));
    expect(script.src).toEqual('https://maps.googleapis.com/maps/api/js?key=test');
    expect(script.type).toEqual('text/javascript');
  });
});