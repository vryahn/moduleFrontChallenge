const user = document.querySelector("#inputEmail");
const password = document.querySelector("#inputPassword");
const loginButton = document.querySelector("#loginButton");
export let tokenAuth;

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const dataLogin = {
    email: user.value,
    password: password.value,
  };



  fetch("http://localhost:8001/users/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json"}, //que tipo de paquete vamos a enviar
    body: JSON.stringify(dataLogin),
  })
    .then((res) => {
      console.log(res);
      /* if (res.status != 200) {
        throw new Error("a chuchita la bolsearon");
      } */
      return res.json(); //return devuelve el metodo json y ese metodo intenta leer el contenido de la respuesta
    })
    .then((data) => {
      console.log("recibi estos datos", data);
      tokenAuth = data.payload;
    })
    .catch((err) => {
      console.error("ocurrio un error", err);
    });
  /* console.log("Login ok", dataLogin); */
});

/* const data = {
    email: "b.ra@live.com.mx",
    password: "1234"
  }
  
  const jsonData = JSON.stringify(data)
  
  fetch("http://localhost:8000/users/auth", {
    "method": "POST",
    "Content-Type": "application/json",
    body: jsonData
  })
  .then((res) => res.json())
  .then((data) => console.log(data))
  
  const token = ""
 */

  module.export;