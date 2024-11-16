const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "0507",
  database: "holid27",
  host: "localhost",
  port: 5432,
});
module.exports = pool;
