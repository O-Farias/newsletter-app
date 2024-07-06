// app.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

let emailList = [];

// Rota para a página inicial
app.get("/", (req, res) => {
  res.render("index");
});

// Rota para a página de sucesso
app.get("/success", (req, res) => {
  res.render("success");
});

// Rota para visualizar a lista de e-mails
app.get("/list", (req, res) => {
  res.render("list", { emails: emailList });
});

// Rota para cadastrar e-mail
app.post("/subscribe", (req, res) => {
  const email = req.body.email;
  if (email) {
    emailList.push(email);
    res.redirect("/success");
  } else {
    res.redirect("/");
  }
});

// Rota para excluir e-mail
app.post("/delete", (req, res) => {
  const emailToDelete = req.body.email;
  emailList = emailList.filter((email) => email !== emailToDelete);
  res.redirect("/list");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
