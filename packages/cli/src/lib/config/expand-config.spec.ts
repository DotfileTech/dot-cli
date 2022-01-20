import { expandConfig } from './expand-config';

describe('expand-config', () => {
  it("should set unspecified version to 'latest'", () => {
    expect(
      expandConfig({ groups: ['dev'], tools: { test: { mode: 'custom' } } })
        .tools.test.version
    ).toEqual('latest');
  });

  it('should set unspecified group to all groups', () => {
    expect(
      expandConfig({ groups: ['dev'], tools: { test: { mode: 'custom' } } })
        .tools.test.groups
    ).toEqual(['dev']);
  });

  it('should set unspecified group to none when no groups are defined', () => {
    expect(
      expandConfig({ tools: { test: { mode: 'custom' } } }).tools.test.groups
    ).toEqual([]);
  });

  it('should fill template in packageUrl', () => {
    expect(
      expandConfig({
        tools: {
          test: {
            version: '1.2.3',
            mode: 'fromUrl',
            packageUrl: 'http://example.com?${version}',
          },
        },
      }).tools.test.packageUrl
    ).toEqual('http://example.com?1.2.3');
  });
});
