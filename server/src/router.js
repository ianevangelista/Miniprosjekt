module.exports = function(app, pool, newsDao, categoryDao, commentDao) {
  // Henter ut alle sakene med viktighet 1
  app.get("", (req, res) => {
    console.log(": fikk request fra klient");
    newsDao.getBreakingNews((status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // Henter ut en bestemt sak
  app.get("/sak/:sak_id", (req, res) => {
    console.log("/sak/:sak_id: fikk request fra klient");
    newsDao.getOne(req.params.sak_id, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // Registrerer en ny sak
  app.post("/registrerSak", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    newsDao.createOne(req.body, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // Sletter en bestemt sak gitt sak_id
  app.delete("/sak/:sak_id", (req, res) => {
    console.log("Fikk DELETE-request fra klient");
    newsDao.deleteOne(req.params.sak_id, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // Oppdaterer en bestemt sak gitt sak_id
  app.put("/sak/:sak_id", (req, res) => {
    console.log("Fikk PUT-request fra klienten");
    newsDao.updateOne(req.body, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.get("/sisteNyheter", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
      console.log("Connected to database");
      if (err) {
        console.log("Feil ved kobling til databasen");
        res.json({ error: "feil ved ved oppkobling" });
      } else {
        connection.query(
          "SELECT sak_id, overskrift, tidspunkt FROM sak JOIN kategori USING(kategori_id) ORDER BY tidspunkt DESC LIMIT 5",

          (err, rows) => {
            connection.release();
            if (err) {
              console.log(err);
              res.json({ error: "error querying" });
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  });

  app.get("/kategori", (req, res) => {
    console.log(": fikk request fra klient");
    categoryDao.getAll((status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // Henter ut sakene til en bestemt kategori
  app.get("/kategori/:id", (req, res) => {
    console.log("/kategori/:id: fikk request fra klient");
    categoryDao.getOne(req.params.id, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // Henter ut bestemte saker på bakgrunn av overskrift
  app.get("/sok/:overskrift", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
      console.log("Connected to database");
      if (err) {
        console.log("Feil ved kobling til databasen");
        res.json({ error: "feil ved ved oppkobling" });
      } else {
        connection.query(
          "SELECT * from sak WHERE overskrift LIKE ? LIMIT 5",
          "%" + req.params.overskrift + "%",

          (err, rows) => {
            connection.release();
            if (err) {
              console.log(err);
              res.json({ error: "error querying" });
            } else {
              console.log(rows);
              res.json(rows);
            }
          }
        );
      }
    });
  });

  // Henter ut kommentarer til en sak
  app.get("/kommentar/:sak_id", (req, res) => {
    console.log("/sak/:sak_id: fikk request fra klient");
    commentDao.getOne(req.params.sak_id, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.post("/registrerKommentar", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    commentDao.createOne(req.body, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // Sletter en bestemt kommentar gitt kommentar_id
  app.delete("/kommentar/:kommentar_id", (req, res) => {
    console.log("Fikk DELETE-request fra klient");
    commentDao.deleteOne(req.params.kommentar_id, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // Oppdaterer rating gitt sak_id
  app.put("/rating/:sak_id", (req, res) => {
    console.log("Fikk PUT-request fra klienten");
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("Feil ved oppkobling");
        res.json({ error: "feil ved oppkobling" });
      } else {
        console.log("Fikk databasekobling");
        var val = [req.body.tommelOpp, req.body.tommelNed, req.body.sak_id];
        console.log(val);
        connection.query(
          "UPDATE sak SET tommelOpp=?, tommelNed=? WHERE sak_id = ?",
          val,
          err => {
            if (err) {
              console.log(err);
              res.status(500);
              res.json({ error: "Feil ved insert" });
            } else {
              console.log("insert ok");
              res.send("");
            }
          }
        );
      }
    });
  });
};
