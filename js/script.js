let employeeInfo;
const container = document.querySelector('#container');
const overlay = document.querySelector('.modal-container');
const modalContent = document.querySelector('#modal-content');
const modal = document.querySelector('.modal');
const closeContainer = document.querySelector('.close-container');
let currentIndex;

fetch('https://randomuser.me/api/?results=12&nat=us,ca')
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

    // animation added to all card elements
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        let randomAniDelay = Math.floor(Math.random() * 500);
        card.style.animation = `fadeIn 1s .${randomAniDelay}s ease forwards`;
    });
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
    // animation
    modal.classList.add("apply-animation");

    currentIndex = parseInt(index);
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
        // currentIndex = index;
        console.log(currentIndex);
    }
})


// If user clicks on the x or it's container then overlay is set to hidden
modal.addEventListener('click', e => {
    const target = e.target;
    const nextButton = document.querySelector('#next');
    const previousButton = document.querySelector('#previous');
    const btnContainer = document.querySelector('.btn-container');
    if (closeContainer.contains(target)) {
        overlay.classList.add("hidden");
    }
    // next and previous buttons
    if (nextButton.contains(target)) {
        modal.classList.remove("apply-animation");
        if (currentIndex >= 11) {
            //disable button
            console.log('previous');
            console.log('button disabled');
        } 
        if (modal.classList === "apply-animation") {
            modal.classList.remove("apply-animation");
        } else {
            console.log('next');
            console.log(currentIndex);
            displayModal(currentIndex + 1);
            modal.classList.remove("apply-animation");
            window.requestAnimationFrame(function() {
                modal.classList.add("apply-animation");
            })
            
            console.log(currentIndex);
        }
    }
    if (previousButton.contains(target)) {
        
        if (currentIndex <= 0) {
            console.log('previous');
            console.log('button disabled');
        } else {
            console.log('previous');
            console.log(currentIndex);
            displayModal(currentIndex - 1);
            modal.classList.remove("apply-animation");
            window.requestAnimationFrame(function() {
                modal.classList.add("apply-animation");
            })
            console.log(currentIndex);
        }
    }
    // modal.style.removeProperty("animation");
})

//Search Functionality
// if the text content of 'name' contains 'currentValue' then diplay flex (current property)
// else hide the cards that do not match
const searchBar = document.querySelector('#search');

searchBar.addEventListener('keyup', e => {
    let currentValue = e.target.value.toLowerCase();
    let names = document.querySelectorAll('.card-content h2');
    names.forEach(name => {
        if (name.textContent.toLowerCase().includes(currentValue)) {
            name.parentNode.parentNode.style.display = 'flex';
        } else {
            name.parentNode.parentNode.style.display = 'none';
        }
    });
})





//Switching Modals
// use arrow keys. if modal is open / not hidden. if right arrow key is pressed,
// employeeInfo[index] +1 or if left arrow key is pressed employeeInfo[index] -1\

// modal.addEventListener('keydown', e => {
//     const card = target.closest(".card");
//     const index = card.getAttribute("data-index");
//     if (e.keyCode === 37) {
//         console.log('left key pressed');
//         displayModal(index - 1);
//     }
//     if (e.keyCode === 39) {
//         console.log('right key pressed');
//     }
// })