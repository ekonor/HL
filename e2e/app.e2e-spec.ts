import { HLPage } from './app.po';

describe('hl App', () => {
  let page: HLPage;

  beforeEach(() => {
    page = new HLPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
