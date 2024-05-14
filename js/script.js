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
    })
    .then(displayEmployees)
    .catch(error => console.error(error));

    function displayEmployees() {

    }
