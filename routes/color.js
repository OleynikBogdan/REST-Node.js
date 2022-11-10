var express = require("express");
var router = express.Router();
var db = require("../db/config");

router.get("/", function (req, res, next) {
    let sql = `
          select * 
          from color
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
    const name_of_color = req.body.name_of_color;
    const data = [name_of_color];
    let sql = "INSERT INTO color(name_of_color) VALUES(?)";
    db.query(sql, [data], (err, result) => {
      if (err) throw err;
      const newId = result.insertId;
      res.setHeader("Content-Type", "application/json");
      res.send({ data: `New color with id = ${newId} was added to DB` });
    });
  });

  /* DELETE grupa from DB by ID. */
router.delete("/:id", (req, res) => {
    let id = req.params.id;
  
    let sql = "delete from color where id=?";
  
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
  
      res.setHeader("Content-Type", "application/json");
      res.send({ data: `Color with id: ${id} was deleted`, deletedId: id });
    });
  });

  router.put("/:id", (req, res) => {
    let id = req.params.id;
  
    const name_of_color = req.body.name_of_color;
  
    const data = [name_of_color, id];
  
    let sql = "UPDATE color SET name_of_color=? where id =?";
    db.query(sql, data, (err, result) => {
      if (err) throw err;
      res.setHeader("Content-Type", "application/json");
      res.send({ data: `Name of color with ${id} was updated to ${name_of_color}` });
    });
  });

  module.exports=router;