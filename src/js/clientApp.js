// import styles from '../css/main.css';
// console.log(styles);

class App {
  constructor(html) {
    this.html = html;
    console.log(html); // eslint-disable-line
  }

  init() {
    console.log('load modules', this.html); // eslint-disable-line
  }
}

const AppInstance = new App('lala');
AppInstance.init();
