export class Router extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"})
      .innerHTML = "<e-switcher></e-switcher>";
  }
}


export class Switcher extends HTMLElement {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.render();
  }

  getFullPath() {
    return location.pathname + location.search + location.hash;
  }

  render() {
    this.innerHTML = `<slot name='${this.getFullPath()}'></slot>`;
  }

  listenToPathChange() {
    window.onpopstate = this.render;
    this.addEventListener("switch-path", this.render);
  }

  removeListenToPathChange() {
    window.onpopstate = null;
    this.removeEventListener("switch-path", this.render);
  }

  connectedCallback() {
    if (this.isConnected) {
      this.listenToPathChange();
    }
  }

  disconnectedCallback() {
    this.removeListenToPathChange();
  }
}
