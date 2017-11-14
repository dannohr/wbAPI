// Bring in our required modules
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");

const { port } = require("../config");

const router = express.Router();
const axios = require("./axios.js");

// App Declaration
const app = express();
app.use("/api", router);

// required middlewares
app.use(json());
app.use(cors());
app.use(express.static(`${__dirname}/../public`));

// setting up express sessions
// secret: config.session.secret;
// app.use(
//   session({
//     secret,
//     resave: true,
//     saveUninitialized: true
//   })
// );

// General Endpoints
app.get("/api/customers", axios.getAllCustomers);
app.get("/api/customersbyid", axios.getCustomerByID);
app.get("/api/customersbyname", axios.getCustomerByName);
// app.post("/api/users", apiCtrl.postUser);
// app.delete("/api/users", apiCtrl.deleteUser);
// app.put("/api/users", apiCtrl.updateUser);

// listen on port
app.listen(port, () => {
  console.log(`LISTENING ON PORT: ${port}`);
});
