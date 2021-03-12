const template = document.createElement("template");

//Standard HTML tag template, hidden until ...
template.innerHTML = `
<style>
    h3 {
        color:green;
    }
</style>
    
    <div class="my-comp">Start template</div>
           
    <button id="btn_info">Press me</button>
        
    
`;

class MyComponent extends HTMLElement {
  constructor() {
    console.log("my components contructor()");
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<h3>Hi My name is ${this.getAttribute(
      "name"
    )}</h3> `;

    //Addera template
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // === Life cycle ===
  //run once, when init
  connectedCallback() {
    console.log("Component connected");
    this.shadowRoot.querySelector("#btn_info").addEventListener("click", () => {
      console.log("Clicking my button");
    });

    //if calling a function
    // addEventListener('click', () => this.toggleInfo());
  }

  //run once, when disconnect
  disconnectedCallback() {
    console.log("Component disconnected");
    this.shadowRoot.querySelector("#btn_info").removeEventListener();
  }

  // Runs if an attribut is changed
  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue != null) {
      console.log(
        `${name}'s value has been changed from ${oldValue} to ${newValue}`
      );
      this.shadowRoot.querySelector("h3").innerText = newValue;
    }
  }
} // end class

window.customElements.define("my-component", MyComponent);
