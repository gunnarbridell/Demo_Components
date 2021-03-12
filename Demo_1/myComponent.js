class MyComponent extends HTMLElement {
  constructor() {
    console.log("my components contructor()");
    super();

    this.innerHTML = `<h3>Hi My name is Gunnar</h3> `;
  }
} // end class

window.customElements.define("my-component", MyComponent);
