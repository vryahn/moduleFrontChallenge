export const removePostMethod = (db, id) => {
    fetch(`${db}/${id}.json`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    // .then((data) => console.log("Elemento eliminado", data));
};