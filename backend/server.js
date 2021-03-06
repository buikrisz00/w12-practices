const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const frontend = path.join(`${__dirname}/../frontend`)
const port = 9000;

app.use(express.json());

app.get("/", (req, res, next) => {
    console.log("Request received");
    res.sendFile(`${frontend}/index.html`);
});

app.get("/admin/order-view", (req, res, next) => {
    res.sendFile(`${frontend}/index.html`);
});

app.get("/kismacska", (req, res, next) => {
    console.log("Request received");
    res.sendFile(`${frontend}/somefile.json`);
});

app.get("/something", (req, res, next) => {
    console.log("Request received for /something endpoint");
    res.send("Thank you for your request! This is our response for /something endpoint.");
});

app.get("/api/v1/users", (req, res) => {
    console.log("Request received for /users endpoint");
    res.sendFile(`${frontend}/users.json`);
})

app.get("/api/v1/users-query", (req, res) => {
    console.dir(req.query);
    console.log(req.query.apiKey);
    if (req.query.apiKey === "apple") {
        res.sendFile(`${frontend}/users.json`);
    } else {
        res.send("Unauthorized request");
    }
})

app.get("/api/v1/users-params/:key", (req, res) => {
    console.dir(req.params);
    console.log(req.params.key);
    if (req.params.key === "apple") {
        res.send("Azt írtad be hogy alma");
    } else {
        res.send("Nem azt írtad be hogy alma");
    }
})

app.get("/api/v1/users/:status", (req, res) => {
    fs.readFile(`${frontend}/users.json`, (error, data) => {
        if (error) {
            res.send("Problem");
        } else {
            if (req.params.status === "active") {
                const users = JSON.parse(data);
                res.send(users.filter(user => user.status === "active"));
            } else if (req.params.status === "passive"){
                const users = JSON.parse(data);
                res.send(users.filter(user => user.status === "passive"));
            } else {
                res.send(`${req.params.status} is not a valid user status`);
            }
        }
    })
})

/* app.get("/api/v1/users/active", (req, res) => {
    fs.readFile(`${frontend}/users.json`, (error, data) => {
        if (error) {
            res.send("Problem");
        } else {
            const users = JSON.parse(data);
            res.send(users.filter(user => user.status === "active"));
        }
    })
})

app.get("/api/v1/users/passive", (req, res) => {
    fs.readFile(`${frontend}/users.json`, (error, data) => {
        if (error) {
            res.send("Problem");
        } else {
            const users = JSON.parse(data);
            res.send(users.filter(user => user.status === "passive"));
        }
    })
}) */

app.post("/users/new", (req, res) => {
    fs.readFile(`${frontend}/users.json`, (error, data) => {
        if (error) {
            console.log(error);
            res.send("Error reading users file");
        } else {
            const users = JSON.parse(data);
            console.log(req.body);
            
            users.push(req.body);

            fs.writeFile(`${frontend}/users.json`, JSON.stringify(users), error => {
                if (error) {
                    console.log(error);
                    res.send("Error writing users file");
                }
            })
            res.send(req.body);
        }
    })
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
});

app.use("/public", express.static(`${frontend}/public`))