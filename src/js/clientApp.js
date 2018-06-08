import { qsa, forEach } from './utils/helper';
import styles from '../css/main.css'; // eslint-disable-line
import sg from '../css/style-guide/style-guide.css'; // eslint-disable-line
class App {
  constructor() {
    this.modules = qsa('[data-script]');

    forEach(this.modules, el => {
      const moduleName = el.getAttribute('data-script');
      const module = el;

      if (!module.getAttribute('data-loaded')) {
        try {
          // loadModule
          // eslint-disable-next-line
          System.import(
            /* webpackChunkName: "sg-grid" */ './components/sg-grid',
          ).then(Module => {
            const component = Module.default;
            component();
          });
        } catch (e) {
          console.log(moduleName, e); // eslint-disable-line
        }
      }
    });
  }

  init() {
    console.log('load modules', this.modules); // eslint-disable-line
  }
}

const AppInstance = new App();
AppInstance.init();
