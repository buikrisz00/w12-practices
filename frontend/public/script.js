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

async function loadEvent() {
    const result = await parseJSON("/api/v1/users");
    const rootElement = document.getElementById("root");
    
    rootElement.insertAdjacentHTML("beforeend", result.map(user => userComponent(user)).join(""));
}

window.addEventListener("load", loadEvent);