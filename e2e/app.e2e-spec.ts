import { FirebaseSandPitPage } from './app.po';

describe('firebase-sand-pit App', () => {
  let page: FirebaseSandPitPage;

  beforeEach(() => {
    page = new FirebaseSandPitPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
