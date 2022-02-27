
async function newFormHandler(event){
    event.preventDefault();

    const atmosphere_rating = document.querySelector('input[name=atmosphere]').value
    const food_rating = document.querySelector('input[name=food]').value;
    const service_rating = document.querySelector('[name=service]').value;
    const overall_rating = document.querySelector('input[name=overall]').value
    const review = document.querySelector('textarea[name=review').value.trim();
    const restaurant_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    console.log(atmosphere_rating, food_rating, service_rating, overall_rating, review, restaurant_id)

    const response = await fetch (`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            atmosphere_rating,
            food_rating,
            service_rating,
            overall_rating,
            review,
            restaurant_id
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

document.querySelector('#submit-review-btn').addEventListener('click', newFormHandler);