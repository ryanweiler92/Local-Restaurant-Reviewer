async function deleteFormHandler(event){
    event.preventDefault();

    const id = document.querySelector('input[name=id]').value
    console.log(id)

    const response = await fetch(`api/reviews/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector("#delete-btn").addEventListener('click', deleteFormHandler)