import db from "./environment";

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
    card.setAttribute("id", id);

  }