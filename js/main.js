import db from "./environment.js";
import { removePostMethod } from "./removePost.js";
const cardsContainer = document.querySelector("#cardsContainer");
const tokenAuth = JSON.parse(localStorage.getItem("token"));

// Botón y evento ordenar por fecha

const orderButton = document.querySelector("#orderByButton");
let descendingOrder = true;

orderButton.addEventListener("click", (e) => {
  e.preventDefault();
  descendingOrder = !descendingOrder;
  cardsContainer.innerHTML = "";
  getAllPosts();
  $("#cardsContainer").load(window.location.href + " #cardsContainer");
});

// Método Get All Posts

const getAllPosts = () => {
  fetch(db + "/post", {
    authorize: "Bearer " + tokenAuth,
  })
    .then((response) => response.json())
    .then((result) => {
      const datos = result.payload;
      if (descendingOrder == true) {
        datos.forEach((dato) => {
          const date = new Date(dato.fecha);
          let month = date.getMonth();
          const card = cardCreation(
            dato.tittle,
            dato.content,
            dato.img,
            dato.creationDate,
            dato.tags,
            dato._id
          );
          cardsContainer.appendChild(card);
        });
      } else {
        datos.reverse().forEach((dato) => {
          const date = new Date(dato.fecha);
          let month = date.getMonth();
          const card = cardCreation(
            dato.tittle,
            dato.content,
            dato.img,
            dato.creationDate,
            dato.tags,
            dato._id
          );
          cardsContainer.appendChild(card);
        });
      }
    });
};

getAllPosts(descendingOrder); // Mandamos llamar al método getAllPosts quien obtiene los datos de firebase y los usa para construir las cards mediante cardCreation

// Metodo Get a Post (obteniendo la info de un solo post)

/* const getAPosts = () => {
  fetch(db + "/post", {
    method: "GET",
    authorize: "Bearer " + tokenAuth,
  })
    .then((response) => response.json())
    .then(( result) => {
      const datos = result.payload; */

const getAPosts = (db, id) => {
  fetch(db + "/post/" + id, {})
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};

// Card Creation Method

const cardCreation = (
  nombre,
  descripcion,
  imagen,
  fechaDeCreacion,
  etiquetas,
  id
) => {
  const card = document.createElement("div");
  card.classList.add("card", "mb-2");
  card.setAttribute("id", "card" + id);

  const img = document.createElement("img"); //Imagen de la card
  img.classList.add("card-img-top");
  img.src = imagen;

  const cardBody = document.createElement("div"); // Este es el div del cuerpo de la card
  cardBody.classList.add("card-body");
  // cardBody.setAttribute("onclick", idFunction(id));

  const creationDate = document.createElement("p"); // Fecha de creación del post
  creationDate.classList.add("card-text");
  creationDate.innerHTML = fechaDeCreacion;

  const name = document.createElement("h5"); // Título del post
  name.classList.add("h5", "card-title");
  name.setAttribute("onclick", "window.location.href='./post.html'");
  name.innerHTML = "<strong>" + nombre + "</strong>";

  const tagsArray = document.createElement("div");
  tagsArray.classList.add("d-flex", "justify-content-start");

  const tags = document.createElement("p");
  tags.innerHTML = "#" + etiquetas;
  tags.classList.add("mx-2");

  const description = document.createElement("p"); // Descripción del post
  description.classList.add("card-text");
  description.innerHTML = descripcion;

  const editButton = document.createElement("a"); // Botón editar
  editButton.classList.add("btn", "btn-primary", "me-2");
  editButton.innerText = "Editar";

  const deleteButton = document.createElement("a"); // Boton eliminar
  deleteButton.classList.add("btn", "btn-danger", "buttonToRemoveCard");
  deleteButton.innerText = "Borrar";
  deleteButton.addEventListener("click", () => {
    removePostMethod(db, id);
    cardsContainer.innerHTML = "";
    getAllPosts(descendingOrder);
  });

  if (imagen != null) cardBody.appendChild(img); // Si el campo de imagen esta vacío, se omite añadir este elemento al DOM
  if (fechaDeCreacion != null) cardBody.appendChild(creationDate); // Si el campo de fecha de creación esta vacío, se omite añadir este elemento al DOM
  cardBody.appendChild(name);
  cardBody.appendChild(tagsArray);
  if (etiquetas != null) tagsArray.appendChild(tags);
  // cardBody.appendChild(editButton);
  cardBody.appendChild(description);
  cardBody.appendChild(deleteButton);
  card.appendChild(cardBody);
  return card;
};

// Filtrado, en proceso

/* const getByMonth = (mes) => {
  fetch(db + ".json", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      const keys = Object.keys(result);
      const allPostsArray = keys.reduce((prev, act) => {
        const postAct = result[act];
        const postCompleto = {
          id: act,
          ...postAct,
        };
        prev.push(postCompleto);
        return prev;
      }, []);
      if (descendingOrder == true) {
        for (const post of allPostsArray.reverse()) {
          const card = cardCreation(
            post.title,
            post.description,
            post.image,
            post.fecha,
            post.tag,
            post.id
          );
          cardsContainer.appendChild(card);
        }
      } else {
        for (const post of allPostsArray) {
          const card = cardCreation(
            post.title,
            post.description,
            post.image,
            post.fecha,
            post.tag,
            post.id
          );
          cardsContainer.appendChild(card);
        }
      }
    });
};
 */