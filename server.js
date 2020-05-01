const express = require("express");
const next = require("next");
const cors = require("cors");
var axios = require('axios');
const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV === "production";
const app = next({
    dev
});
const handle = app.getRequestHandler();

const _BACKEND_SERVER_ADDRESS = "http://127.0.0.1:8000";

app
    .prepare()
    .then(() => {
        const server = express();

        //setup routes
        server.use(cors());
        server.use(bodyParser());

        server.post('/predict_disease_incident', function (req, res, next) {

            axios
                .post(`${_BACKEND_SERVER_ADDRESS}/predict_disease_incident`, req.body)
                .then(resp => {

                    res.send({
                        predictions: resp.data,
                        status: {
                            status: resp.status,
                            statusText: resp.statusText
                        },
                        req_data: req.body
                    });
                })
                .catch(error => {
                    console.log(error);
                    res.send({
                        error
                    });
                });


        });


        server.get("*", (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log("> Ready on http://localhost:3000");
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });