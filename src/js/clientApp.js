import styles from '../css/main.css'; // eslint-disable-line
import sg from '../css/style-guide/style-guide.css'; // eslint-disable-line

class App {
  constructor() {
    this.modules = '';
  }

  init() {
    console.log('load modules', this.html); // eslint-disable-line
  }
}

const AppInstance = new App();
AppInstance.init();
