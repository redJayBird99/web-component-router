class Router extends HTMLElement {
  connectedCallback() {
    if (this.isConnected) {
      this.attachShadow({mode: "open"}).innerHTML = "<e-switcher></e-switcher>";
    }
  }
}


class Switcher extends HTMLElement {
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


class Link extends HTMLAnchorElement {
  getRouter(from) {
    const router = from.closest('e-router');

    if (router) {
      return router;
    }
    if (document.getRootNode() instanceof HTMLDocument) {
      throw new Error("e-link isn't located in any e-router");
    }

    return this.getRouter(from.getRootNode().host);
  }


  getSwitcher() {
    return this.getRouter(this).shadowRoot.firstElementChild;
  }


  getTargetHref() {
    return location.origin + this.dataset.path;
  }


  handleClick() {
    this.onclick = () => {
      window.history.pushState({}, '', this.getTargetHref());
      this.switcher.dispatchEvent(new CustomEvent('switch-path'));
      return false;
    }
  }


  render() {
    this.innerHTML = `<slot></slot>`;
  }


  connectedCallback() {
    if (this.isConnected) {
      this.switcher = this.getSwitcher();
      this.render();
      this.handleClick();
    }
  }


  static get observedAttributes() {
    return ['data-path'];
  }


  attributeChangedCallback() {
    this.href = this.getTargetHref();
  }
}


customElements.define('e-link', Link, {extends: 'a'});
customElements.define('e-switcher', Switcher);
customElements.define('e-router', Router);
