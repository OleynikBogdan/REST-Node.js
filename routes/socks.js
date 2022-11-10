var express = require("express");
var router = express.Router();
var db = require("../db/config");

router.get("/", function (req, res, next) {
    let sql = `
          select * 
          from socks
      `;
  
    db.query(sql, (error, result) => {
      if (error) {
        console.error(error);
        throw error;
      }
      if (!result.length) {
        console.log("Table : color is empty");
        res.send("Table : color is empty");
      } else {
        res.send(result);
      }
    });
  });

router.post("/", (req, res) => {
    const size = req.body.size;
    const id_color = req.body.id_color;
    const price = req.body.price;
    const data = [size , id_color , price];
    let sql = "INSERT INTO socks(size , id_color , price) VALUES(?)";
    db.query(sql, [data], (err, result) => {
      if (err) throw err;
      const newId = result.insertId;
      res.setHeader("Content-Type", "application/json");
      res.send({ data: `New socks with id = ${newId} was added to DB` });
    });
  });

  router.delete("/:id", (req, res) => {
    let id = req.params.id;
  
    let sql = "delete from socks where id=?";
  
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
  
      res.setHeader("Content-Type", "application/json");
      res.send({ data: `Socks with id: ${id} was deleted`, deletedId: id });
    });
  });

  router.put("/:id", (req, res) => {
    let id = req.params.id;
    const size = req.body.size;
    const id_color = req.body.id_color;
    const price = req.body.price;
    const data = [size , id_color , price, id];
  
    let sql = "UPDATE socks SET size=?, id_color=?, price=? where id =?";
    db.query(sql, data, (err, result) => {
      if (err) throw err;
      res.setHeader("Content-Type", "application/json");
      res.send({ data: `Name of socks with ${id} was updated to ${size, id_color, price}` });
    });
  });

  module.exports = router;