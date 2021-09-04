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
    this.renderPage = this.renderPage.bind(this);
    this.renderWhenDefault = this.renderWhenDefault.bind(this);
    this.innerHTML = "<slot></slot>";
    this.pageSlot = this.firstElementChild;
  }

  getFullPath() {
    return location.pathname + location.search + location.hash;
  }

  renderPage() {
    this.pageSlot.setAttribute("name", this.getFullPath());
  }

  renderWhenDefault() {
    if (this.pageSlot.assignedElements().length === 0) {
      this.pageSlot.setAttribute("name", "~default");
    }
  }

  listenToPathChange() {
    window.onpopstate = this.renderPage;
    this.addEventListener("switch-path", this.renderPage);
  }

  removeListenToPathChange() {
    window.onpopstate = null;
    this.removeEventListener("switch-path", this.renderPage);
  }

  connectedCallback() {
    if (this.isConnected) {
      this.listenToPathChange();
      this.pageSlot.addEventListener("slotchange", this.renderWhenDefault);
      this.renderPage();
    }
  }

  disconnectedCallback() {
    this.removeListenToPathChange();
    this.pageSlot.removeEventListener("slotchange", this.renderWhenDefault);
  }
}
