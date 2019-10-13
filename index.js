const express = require("express");
const morgan = require("morgan");
const app = express();

//Settings
app.set("appName", "Express tutorial");
app.set("port", 3001);
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

function logger(req, res, next) {
  console.log(
    `Route received ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
}

// Routes

app.get("/", (req, res) => {
  const data = [
    { name: "Pepe" },
    { name: "Esteban" },
    { name: "Juan" },
    { name: "Carlos" }
  ];
  res.render("index.ejs", { people: data });
});

app.get("/about", (req, res) => {
  res.send("About meeee");
});

app.get("/contact", (req, res) => {
  res.send("Contact");
});

app.all("/user", (req, res, next) => {
  console.log("User transaction logged");
  next();
});

app.get("/user", (req, res) => {
  res.json({
    name: "Estebandido",
    lastName: "Saldarriaga Alzate",
    age: 19,
    city: "Medellín"
  });
});

app.post("/user/:id", (req, res) => {
  console.log(req.params);
  res.send(`Bienvenido ${req.body.name} - ${req.body.lastName}`);
});

app.put("/user/:id", (req, res) => {
  console.log(req.params);
  res.send(`User ${req.params.id} updated `);
});

app.delete("/user/:id", (req, res) => {
  console.log(req.params);
  res.send(`User ${req.params.id} eliminado`);
});

app.use(express.static("public"));

app.listen(app.get("port"), () => {
  console.log(app.get("appName"));
  console.log(`Server on port ${app.get("port")}`);
});
