import { AtomPage } from './app.po';

describe('atom App', () => {
  let page: AtomPage;

  beforeEach(() => {
    page = new AtomPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
