import { qsa, forEach } from './utils/helper';
import styles from '../css/main.css'; // eslint-disable-line
import sg from '../css/style-guide/style-guide.css'; // eslint-disable-line
class App {
  constructor() {
    this.modules = qsa('[data-script]');

    forEach(this.modules, el => {
      const moduleName = el.getAttribute('data-script');
      const html = el;

      if (!html.getAttribute('data-loaded')) {
        try {
          // loadModule
          // eslint-disable-next-line
          System.import(
            /* webpackChunkName: "sg-grid" */ `./components/${moduleName}`,
          ).then(Module => {
            const component = Module.default;

            new component(html); // eslint-disable-line
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
