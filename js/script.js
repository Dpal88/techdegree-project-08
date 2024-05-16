let userInfo;
fetch('https://randomuser.me/api/?results=12')
    .then(response => {
        if(!response.ok) {
            throw new Error("Could not fetch resource");
        }
        return response.json();
    })
    .then(data => {
        userInfo = data;
        console.log(userInfo);
        console.log(data.results);
        displayEmployees(data.results);
        // console.log(userInfo.results[0].name.first);
    })
    // .then(displayEmployees(userInfo))
    .catch(error => console.error(error));

function displayEmployees(data) {
    const container = document.getElementById('container');

    data.map(user => {
        console.log(user);
        let i = 1;

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

        i ++;
    })
}
