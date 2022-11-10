var express = require("express");
var router = express.Router();
var db = require("../db/config");

router.get("/", function (req, res, next) {
    let sql = `
          select * 
          from orders
      `;
  
    db.query(sql, (error, result) => {
      if (error) {
        console.error(error);
        throw error;
      }
      if (!result.length) {
        console.log("Table : orders is empty");
        res.send("Table : orders is empty");
      } else {
        res.send(result);
      }
    });
  });

  router.post("/", (req, res) => {
    const id_buyer = req.body.id_buyer;
    const id_socks = req.body.id_socks;
    const date = req.body.date;
    const count = req.body.count;
    const data = [id_buyer , id_socks , date, count];
    let sql = "INSERT INTO orders(id_buyer , id_socks , date, count) VALUES(?)";
    db.query(sql, [data], (err, result) => {
      if (err) throw err;
      const newId = result.insertId;
      res.setHeader("Content-Type", "application/json");
      res.send({ data: `New orders with id = ${newId} was added to DB` });
    });
  });

  router.delete("/:id", (req, res) => {
    let id = req.params.id;
  
    let sql = "delete from orders where id=?";
  
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
  
      res.setHeader("Content-Type", "application/json");
      res.send({ data: `Order with id: ${id} was deleted`, deletedId: id });
    });
  });


  router.put("/:id", (req, res) => {
    let id = req.params.id;
    const id_buyer = req.body.id_buyer;
    const id_socks = req.body.id_socks;
    const date = req.body.date;
    const count = req.body.count;
    const data = [id_buyer , id_socks , date, count, id];
  
    let sql = "UPDATE orders SET id_buyer=?, id_socks=?, date=?, count=? where id =?";
    db.query(sql, data, (err, result) => {
      if (err) throw err;
      res.setHeader("Content-Type", "application/json");
      res.send({ data: `Name of socks with ${id} was updated to ${id_buyer , id_socks , date, count}` });
    });
  });

module.exports = router;