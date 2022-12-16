import db from "./environment.js";
const newTaskDescriptionInput=document.getElementById('addDescription');
const newTaskTitleInput=document.getElementById('addTitle');
const newTag=document.getElementById('addTags');
const newPostBtn=document.getElementById('publishContent');

const imgurl=document.querySelector('#addCoverImage');

newPostBtn.addEventListener('click',(e)=>{

  const date = new Date();
 
  const newPost={
    title: newTaskTitleInput.value,
    tag: newTag.value,
    description:newTaskDescriptionInput.value,
    image: imgurl.value,
    fecha: date.toISOString()

  };
  fetch(db+".json",{
    method: 'POST', 
    headers: {"Content-Type": "application/json"}, //que tipo de paquete vamos a enviar
    body:JSON.stringify(newPost),
  }).then((res)=>{
    window.location.replace('./index.html');
    return res.json();//return devuelve el metodo json y ese metodo intenta leer el contenido de la respuesta

  }).then((data)=>{
    console.log("recibi estos datos",data);
  }).catch((err)=>{
    console.error("ocurrio un error",err);
  })
  console.log("Nueva tarea", newPost);

  newTaskDescriptionInput.value="";
  newTaskTitleInput.value="";
  newTag.value="";

});

