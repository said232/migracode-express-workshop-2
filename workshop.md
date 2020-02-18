# week 17 node workshop

## What this workshop is about

Last week, we worked on getting introduced to Node.js and how to develop REST APIs using node and express.

For this week, the aim is to get a better hold of that knowledge and practice it, while also expanding some theoretical concepts of last week into practical implementations.

## Requisites

* Have node and npm installed
* Have postman installed
* Having done last week's worpshop

# The workshop itself

## Init the project

After cloning your fork of the project, you already have a git repository. As such there's no need to `git init`.

What we need now is to do `npm init` in the root of the project folder. As seen last week, this will initialize a package.json file for us to add dependencies to the project.

See last week's workshop for more details.

## Step 2 - Installing dependencies

As we're going to make an express based service, we need first to install some dependencies before writing any code.

As such, we'll install express. We also need to install body-parser as our API is going to accept POST and PUT calls.

As we're going to expand last week's understanding of HTTP status codes, we're going to install a module for formatting such errors, `boom`.

```sh
npm install express body-parser @hapi/boom --save
```

Express and body-parser should now be installed. Check your `package.json` file to make sure both have been added as a dependency.

In the same maner, to avoid having to manually reload the server every timne we make a change, we have to install `nodemon` as a devDependency. To do so:

```sh
npm install -D nodemon --save
```

Also, in your package.json, in the scripts section, add the following:
 ```
  start: "node server.js",
  dev: 'nodemon server.js'
 ```

## Step 3 - Starting to build the server

The first thing after installing the dependencies we need we need to do is build our server.

### 1. Create a `server.js` file

Let's build our server! Before we do anything, let's create a new file called
`server.js`. This is where all our server code is going to live.

### 2. Import the dependencies

We already saw how to include express and body-parser in our code in last week's workshop. It's moment to do that again:

```js
const express = require("express");
const bodyParser = require("body-parser");
const boom = require("@hapi/boom");
```

Also, in this project, there's a little helper module that will help us with managing the data provided in this workshop.

For requiring it, as it is a local file, we need to do the following:

```js
const utils = require("./utils");
```

This file contains helper functions creating, updating, deleting and so on the list of bookings we will be working with. More on that later

> Let us get used to ES6 syntax - so use `const` and `let` instead of
> `var`, arrow methods instead of functions, etc...

### 3. Initialise the server

To initialise our server, we need to call the `express()` function. This
will create an Express application for us to work with.

Check last week's workshop for more information if needed.

### 4. Start 'listening' for potential requests

One more step left before being able to listen to requests, we need to make express listening to a port for incoming requests.

Remember that in last week's exercises, we did this calling  **`app.listen`**.

 This method takes two arguments:
a **port** and a **callback function** telling it what to do once the server is
running.

> Need clarification? Read more about the `app.listen` method in the [Express documentation](http://expressjs.com/en/4x/api.html#app.listen).

We're going to run our server on port `3000`, and add a simple `console.log` in the callback function. Update your `server.js` file, calling the `app.listen` method.

An example of what we did last time:

```js
app.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
```

> Try to use ES6 arrow functions instead of `function`.

### 5. Starting the server

To start the server directly from command line, we can use

```sh
node server.js
```

This will start the server, but we'll have to stop it and start it again every time we want to see a change.

For avoiding that, let's startit with nodemon, which we added an npm script before for doing that:

```sh
npm run dev
```

This way, nodemon watches the server.js file for changes and then reloads the server when needed.

## Step 4 - Communicating with the server

Now that we have the base code for a server, let's start adding endpoints so that we can interact with it. In express, endpoints are defined using `app.get`(or any other htpp verb) and are passed an string (the path to listen for) and a **handler functions**.

### Remembering: What is a handler function?

When a request reaches the server, we need a way of responding to it. In comes the handler function.

The handler function is just a function which receives requests and handles them, hence the name.

The handler function is always called with a `request` and `response` object. The response object is what gets sent back to the client. It contains the information that gets displayed in the web page. You can decide what to send back in your response.

### What do an endpoint and handler function look like in Express?

Let's see a basic example of an endpoint in express, with `app.get` receiving both the path and the handler.

```js
app.get("/", function(req, res) {
  res.send("Hello World!");
});
```

Here, we are telling our server to respond with "Hello World!" when someone
tries to access the webpage.

### How to call the server and test it's working

For making calls to the server, we will be using postman, like we did last week. Remember that the browser only makes GET calls and that's why we need postman, to make POST, PUT and DELETE calls.

### What we will be creating in this workshop

For this workshop, we are going to be working with hotel bookings data, like we did in a react exercise.

We are going to create endpoints for:

1. Listing all the bookings (GET /bookings)
2. Retrieving one booking (GET /bookings/:bookingId)
3. Creating new bookings (POST /bookings)
4. Deleting booking (DELETE /bookings/:bookingId)
5. Updating a booking (PUT /bookings/:bookingId)

# Exercises

## 0. What is provided for us

In this project, you have the data for your endpoints and a helper utility for manipulating that data already included for you.

Writing `utils.` should show in vscode the number of functions available to you and their documentation.

All utils methods will throw errors if something is not going well (for example, creating bookings with the same id, or updating a booking that does not exist) to help you go towards the correct implementation

We can use boom for generating the errors (boom.badRequest, for example, or boom.notFound). Each of boom functions, takes a string as argument for the error message, for example:

```js
boom.badRequest("wrong data")
```

## 1. Listing all the bookings (GET /bookings)
We need to create an enpoint that responds with the complete list of bookings, and with status 200

How to test everything is working:

1. Get the list of bookings
2. You should see al the bookings found in data.json

## 2. Retrieving one booking (GET /bookings/:bookingId)
We need to create an endpoint that returns a booking if it exists, or a 404 error if it does not exist

How to test everything is working:

1. Get the list of bookings
2. Copy one booking id
3. Make a get /bookings/COPIED_BOOKING_ID request
4. You should get that booking
5. Make a get /bookings/999
6. You should recieve a 404 error.

## 3. Creating new bookings (POST /bookings)
We need to create an endpoint that creates a booking with the data recieved responding with a 200 and an empty response , or, otherwise return a 400 (bad request) HTTP error if a booking with the same id exists

How to test everything is working:

1. Get the list of bookings
2. Send a POST request for creating a booking(you can copy the body from a booking object of the get bookings list, remember to change the id)
3. Get that booking by doing a get /bookings/NEW_BOOKING_ID. It should be updated
4. Try to update the sdame against a non existing booking (id 999 for example). You should recieve a 404 status response in postman.

## 4. Deleting booking (DELETE /bookings/:bookingId)
We need to create an endpoint that deletes a booking, returning an empty 200 response if the booking exists, or, otherwise return a 404 (not found) HTTP error if the booking does not exist.

1. Get the list of bookings
2. Send a delete request for removing a booking that already exists
3. Get that booking by doing a get /bookings/THAT_BOOKING_ID. You should get a 404 status response
4. Try to delete the same booking. You should recieve a 404 status response in postman.
5. Try to delete a non existing booking. You should recieve a 404 status response in postman.

## 5. Updating a booking (PUT /bookings/:bookingId)
We need to create an endpoint that updates a booking with the data recieved if said booking exists, or, otherwise return a 404 (not found) HTTP error if the booking does not exist.

How to test it works:

1. Get the list of bookings
2. Send a PUT request for updating a booking that already exists (you can copy the body from a booking object of the get bookings list)
3. Get that booking by doing a get /bookings/THAT_BOOKING_ID. It should be updated
4. Try to make the same update against a non existing booking (id 999 for example). You should recieve a 404 status response in postman.

# Extras
Congratulations on finishing all the exercises
