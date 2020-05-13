// eslint-disable-next-line no-console
import Data from './Model/Data';
import Presenter from './Presenter/Presenter';

const appEl = document.querySelector('.timeline');
const model = new Data();
const presenter = new Presenter(appEl, model);
presenter.init();
