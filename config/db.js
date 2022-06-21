const Postgre = require("pg").Pool;

const connection = new Postgre({
  user: "rezhariansyah",
  host: "localhost",
  database: "mama_recipe",
  password: "Raffiandhik4",
  port: "5432",
});

module.exports = connection;
