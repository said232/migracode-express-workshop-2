const express = require("express");
const bodyParser = require("body-parser");
const boom = require("@hapi/boom");
const utils = require("./utils");

const app = express();

app.use(bodyParser.json())

app.get("/bookings", function (req, res) {
    res.send(utils.getAllBookings());
});


app.get("/bookings/:Id", function (req, res) {

    const id = parseInt(req.params.Id)

    if (utils.checkBookingExists(id)) {
        res.send(utils.getBooking(id))
    } else {
        res.status(404).send(boom.notFound().output)

    }
});


app.post("/bookings", function (req, res) {

    const id = req.body.id

    if (utils.checkBookingExists(id)) {
        res.status(400).send(boom.badRequest().output)

    } else {
        utils.createBooking(req.body)

        res.send()
    }
});

app.delete("/bookings/:Id", function (req, res) {

    const id = parseInt(req.params.Id)

    if (utils.checkBookingExists(id)) {
        res.send(utils.deleteBooking(id))
    } else {
        res.status(404).send(boom.notFound().output)

    }
});





app.listen(3000, () => {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});