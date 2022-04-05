const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const frontend = path.join(`${__dirname}/../frontend`)
const port = 9000;

app.use("/public", express.static(`${frontend}/public`))

app.get("/", (req, res, next) => {
    console.log("Request received");
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
    if (req.params.status === "active") {
        fs.readFile(`${frontend}/users.json`, (error, data) => {
            if (error) {
                res.send("Problem");
            } else {
                const users = JSON.parse(data);
                res.send(users.filter(user => user.status === "active"));
            }
        })
    } else {
        fs.readFile(`${frontend}/users.json`, (error, data) => {
            if (error) {
                res.send("Problem");
            } else {
                const users = JSON.parse(data);
                res.send(users.filter(user => user.status === "passive"));
            }
        })
    }
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

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
});