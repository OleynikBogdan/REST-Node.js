var express = require("express");
var router = express.Router();
var db = require("../db/config");

router.get("/", function (req, res, next) {
    let sql = `
          select * 
          from buyer
      `;
  
    db.query(sql, (error, result) => {
      if (error) {
        console.error(error);
        throw error;
      }
      if (!result.length) {
        console.log("Table : buyer is empty");
        res.send("Table : buyer is empty");
      } else {
        res.send(result);
      }
    });
  });

router.post("/", (req, res) => {
    const pib = req.body.pib;
    const phone = req.body.phone;
    const data = [pib , phone];
    let sql = "INSERT INTO buyer(pib, phone) VALUES(?)";
    db.query(sql, [data], (err, result) => {
      if (err) throw err;
      const newId = result.insertId;
      res.setHeader("Content-Type", "application/json");
      res.send({ data: `New buyer with id = ${newId} was added to DB` });
    });
  });

  /* DELETE grupa from DB by ID. */
  router.delete("/:id", (req, res) => {
    let id = req.params.id;
  
    let sql = "delete from buyer where id=?";
  
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
  
      res.setHeader("Content-Type", "application/json");
      res.send({ data: `Buyer with id: ${id} was deleted`, deletedId: id });
    });
  });


  router.put("/:id", (req, res) => {
    let id = req.params.id;
    const pib = req.body.pib;
    const phone = req.body.phone;
  
    const data = [pib, phone, id];
  
    let sql = "UPDATE buyer SET pib=?, phone=? where id =?";
    db.query(sql, data, (err, result) => {
      if (err) throw err;
      res.setHeader("Content-Type", "application/json");
      res.send({ data: `Name of buyer with ${id} was updated to ${pib, phone}` });
    });
  });

  module.exports = router;