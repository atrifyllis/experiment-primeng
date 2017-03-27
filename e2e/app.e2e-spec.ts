import { ExperimentPrimengPage } from './app.po';

describe('experiment-primeng App', () => {
  let page: ExperimentPrimengPage;

  beforeEach(() => {
    page = new ExperimentPrimengPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
