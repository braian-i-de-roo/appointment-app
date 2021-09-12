describe('App', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should should the auth page layout', async () => {
    await expect(element(by.id('loginViewLayout'))).toBeVisible();
  });
});
