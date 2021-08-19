import {Link} from "./link.js";
import {Router, Switcher} from "./router.js";

customElements.define("e-link", Link, {extends: "a"});
customElements.define("e-switcher", Switcher);
customElements.define("e-router", Router);
