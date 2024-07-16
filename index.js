const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("server run !!");
});

app.get("/", (req, res) => {
  fs.readFile("./data/users.json", (error, data) => {
    const Data = JSON.parse(data.toString());
    console.log(Data);
    res.status(200).render("index", { Data }); //render("about")
  });
  // fs.readFile("./data/users.json",(error,data)=>{
  //     const ob = JSON.parse(data.toString());
  //     console.log(ob[0].name);
  //     fs.writeFile("./data/users.json",JSON.stringify(ob),()=>{})
  // })
});
app.get("/create", (req, res) => {
  res.status(200).render("create");
});
app.post("/create", (req, res) => {
  fs.readFile("./data/users.json", (error, data) => {
    const ob = JSON.parse(data.toString());
    ob.push(req.body);
    fs.writeFile("./data/users.json", JSON.stringify(ob), () => {});
  });

  res.status(200).redirect("/");
});
app.get("/update/:id", (req, res) => {
  console.log(req.params.id);
  res.status(200).render("details");
});
