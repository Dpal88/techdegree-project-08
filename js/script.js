let userInfo;
fetch('https://randomuser.me/api/?results=12')
    .then(response => {
        if(!response.ok) {
            throw new Error("Could not fetch resource");
        }
        return response.json();
    })
    .then(data => {
        console.log(data.results);
        userInfo = data.results;
        displayEmployees(data.results);
    })
    .catch(error => console.error(error));

// Loops over each object in the array & sets the inner html inside of container
function displayEmployees(data) {
    const container = document.getElementById('container');
    let i = 0;

    data.map(user => {
        // console.log(user);

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


//Uses data-index from cards to retrieve data from 'userInfo' variable &
// then generates and dispays data into 'modal-content' div
function displayModal(index) {
    // let {name, dob, phone, email, location: { city, street, state, postcode }, picture} = userInfo[index];

    let date = new Date(userInfo[index].dob.date); //refresher on how date object works
    const overlay = document.querySelector('.modal-container');
    const modalContent = document.getElementById('modal-content');

    const modalHTML = `
            
            <img src="${userInfo[index].picture.large}">
            <h2>${userInfo[index].name.first} ${userInfo[index].name.last}</h2>
            <p id="email">${userInfo[index].email}</p>
            <p id="city">${userInfo[index].location.city}</p>
            <p id="phone">${userInfo[index].phone}</p>
            <p id="address">${userInfo[index].location.street.name}, ${userInfo[index].location.state} ${userInfo[index].location.postcode}</p>
            <p id="birthday">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    `;

    overlay.classList.remove("hidden");
    modalContent.innerHTML = modalHTML;
    
}


const container = document.getElementById('container');

//If user clicks on card then displayModal function will run
container.addEventListener('click', e => {
    const target = e.target;
    // const card = document.getElementsByClassName("card");
    if (target !== container) {
        const card = target.closest(".card"); //how does closest method work?
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
})

const overlay = document.querySelector('.modal-container');
const modal = document.querySelector('.modal');
const closeContainer = document.querySelector('.close-container');
const closeX = document.getElementById("close");

//If user clicks on the x or it's container then overlay is set to hidden
modal.addEventListener('click', e => {
    const target = e.target;
    if (target === closeContainer || target === closeX) {
        // overlay.className += " hidden";
        overlay.classList.add("hidden");
    }
})


