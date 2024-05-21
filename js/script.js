let employeeInfo;
const container = document.querySelector('#container');
const overlay = document.querySelector('.modal-container');
const modalContent = document.querySelector('#modal-content');
const modal = document.querySelector('.modal');
const closeContainer = document.querySelector('.close-container');

fetch('https://randomuser.me/api/?results=12')
    .then(response => {
        if(!response.ok) {
            throw new Error("Could not fetch resource");
        }
        return response.json();
    })
    .then(data => data.results)
    .then(data => {
        console.log(data);
        employeeInfo = data;
        displayEmployees(data);
    })
    .catch(error => console.error(error));

// Loops over each object in the array & sets the inner html inside of container
function displayEmployees(data) {
    let i = 0;

    data.map(user => {

        container.innerHTML += `
            <div class="card" data-index="${i}">
                <div class="img-wrapper">
                    <img class="avatar" src=${user.picture.medium}>
                </div>
                <div class="card-content">
                    <h2>${user.name.first} ${user.name.last}</h2>
                    <p>${user.email}</p>
                    <p>${user.location.city}</p>
                </div>
            </div>
        `
        i += 1;
    })
}


// Uses data-index from cards to retrieve data from 'employeeInfo' variable &
// then generates and dispays data into 'modal-content' div
function displayModal(index) {

    let {name, dob, phone, email, picture, location: { city, street, state, postcode } } = employeeInfo[index];
    let date = new Date(dob.date);

    const modalHTML = `
            
            <img src="${picture.large}">
            <h2>${name.first} ${name.last}</h2>
            <p id="email">${email}</p>
            <p id="city">${city}</p>
            <p id="phone">${phone}</p>
            <p id="address">${street.name}, ${state} ${postcode}</p>
            <p id="birthday">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    `;

    overlay.classList.remove("hidden");
    modalContent.innerHTML = modalHTML;
    
}



// If user clicks on card then displayModal function will run
container.addEventListener('click', e => {
    const target = e.target;

    if (target !== container) {
        // 'card' looks for the closest element that contains the class of card
        // 'index' gets the data-index of the closest card
        const card = target.closest(".card");
        const index = card.getAttribute("data-index");

        displayModal(index);
    }
})


// If user clicks on the x or it's container then overlay is set to hidden
modal.addEventListener('click', e => {
    const target = e.target;
    if (closeContainer.contains(target)) {
        overlay.classList.add("hidden");
    }
})
