async function parseJSON(url) {
    const response = await fetch(url);
    return response.json();
}

function userComponent({firstName, surname}) {
    return `
        <div>
            <h1>${firstName}</h1>
            <h2>${surname}</h2>
        </div>
    `;
}

function addUserComponent() {
    return `
        <div>
            <input type="text" name="firstName" class="firstName" placeholder="First Name">
            <input type="text" name="surname" class="surname" placeholder="Surname">
            <button class="addNew">Send</button>
        </div>
    `;
}

async function loadEvent() {
    if (window.location.pathname === "/admin/order-view") {
        console.log("Mi most az admin felületen vagyunk");
    } else {
        console.log("Mi most a vásárlói felületen vagyunk");
    }

    const result = await parseJSON("/api/v1/users");
    const rootElement = document.getElementById("root");
    
    rootElement.insertAdjacentHTML("beforeend", result.map(user => userComponent(user)).join(""));

    rootElement.insertAdjacentHTML("afterend", addUserComponent());

    const button = document.querySelector(".addNew");
    const firstName = document.querySelector(`.firstName`);
    const surname = document.querySelector(`.surname`);

    button.addEventListener("click", e => {
        const userData = {
            firstName: firstName.value,
            surname: surname.value
        };

        fetch("/users/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(async data => {
            const user = await data.json();
            rootElement.insertAdjacentHTML("beforeend", userComponent(user));
        })
    })
}

window.addEventListener("load", loadEvent);