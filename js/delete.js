const deletePost = (id) => {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .catch(error => {
        alertManager('error', error);
    })
    .then(res => {
        alertManager('sucess', res.mensaje);
        getPosts();
        deleteId = null;
    })
}