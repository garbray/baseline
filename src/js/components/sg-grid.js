import { $on, toggleClass } from '../utils/helper';

export default class helper {
  constructor(html) {
    this.html = html;

    $on(window, 'keydown', this.toggleGrid.bind(this));
  }

  /**
   * Activate and deactivate overlay gridlayout
   * @param  {Event} event listen a keydown event
   * @return {void}
   */
  toggleGrid(event) {
    const windowHeight = document.body.scrollHeight;
    this.html.style.height = `${windowHeight}px`;

    if (event.keyCode === 68) {
      toggleClass(this.html, 'overlay');
    }
  }
}
