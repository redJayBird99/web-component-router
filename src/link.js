export class Link extends HTMLAnchorElement {
  getRouter(from) {
    const router = from.closest("e-router");

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
      window.history.pushState({}, "", this.getTargetHref());
      this.switcher.dispatchEvent(new CustomEvent("switch-path"));
      return false;
    };
  }

  render() {
    this.innerHTML = "<slot></slot>";
  }

  connectedCallback() {
    if (this.isConnected) {
      this.switcher = this.getSwitcher();
      this.render();
      this.handleClick();
    }
  }

  static get observedAttributes() {
    return ["data-path"];
  }

  attributeChangedCallback() {
    this.href = this.getTargetHref();
  }
}
