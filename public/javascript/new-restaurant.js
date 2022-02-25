function newPostFormDisplay() {
    document.getElementById('form-container').setAttribute("class", "container mt-4 bg-light rounded")
};

async function newFormHandler(event){
    event.preventDefault();

    const name = document.querySelector('input[name=restaurant-name').value.trim();
    const cuisine = document.querySelector('input[type=radio][name=cuisine]:checked').value;
    const price_range = document.querySelector('input[type=radio][name=price-range]:checked').value;
    const address = document.querySelector('input[name=address').value.trim();

    console.log(name, cuisine, price_range, address)

    const response = await fetch (`/api/restaurants`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            cuisine,
            price_range,
            address
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText)
    }
};



document.querySelector('#new-post-btn').addEventListener('click', newPostFormDisplay);
document.querySelector('#submit-post-btn').addEventListener('click', newFormHandler);