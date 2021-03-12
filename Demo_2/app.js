console.log("app.js");
import "./myComponent.js";

//console.log("Set attribute")
document.querySelector("#btn_change_attrib").addEventListener("click", () => {
  console.log("Changing atttribute");
  document.querySelector("my-component").setAttribute("name", "Arne");
});
