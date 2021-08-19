export class Router extends HTMLElement {
  connectedCallback() {
    if (this.isConnected) {
      this.attachShadow({mode: "open"}).innerHTML = "<e-switcher></e-switcher>";
    }
  }
}


export class Switcher extends HTMLElement {
  update = () => {
    const newFullPath = this.getFullPath();

    if (newFullPath !== this.fullPath) {
      this.fullPath = newFullPath;
      this.render();
    }
  }

  getFullPath() {
    return location.pathname + location.search + location.hash;
  }

  render() {
    this.innerHTML = `<slot name='${this.fullPath}'></slot>`;
  }

  listenToPathChange() {
    window.onpopstate = this.update;
    this.addEventListener('switch-path', this.update);
  }

  connectedCallback() {
    if (this.isConnected) {
      this.fullPath = this.getFullPath();
      this.render();
      this.listenToPathChange();
    }
  }

  disconnectedCallback() {
    window.onpopstate = null;
  }
}
