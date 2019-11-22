module.exports = function(app, pool) {
  // Henter ut alle sakene med viktighet 1
  app.get("", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
      console.log("Connected to database");
      if (err) {
        console.log("Feil ved kobling til databasen");
        res.json({ error: "feil ved ved oppkobling" });
      } else {
        connection.query(
          "SELECT sak_id, overskrift, ingress, innhold, tidspunkt, bilde, kategori_navn, viktighet, tommelOpp, tommelNed FROM sak JOIN kategori USING(kategori_id) WHERE viktighet = 1 ORDER BY tidspunkt DESC LIMIT 22",

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
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
      console.log("Connected to database");
      if (err) {
        console.log("Feil ved kobling til databasen");
        res.json({ error: "feil ved ved oppkobling" });
      } else {
        connection.query(
          "SELECT * from kategori ORDER BY kategori_id ASC",

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

  // Henter ut sakene til en bestemt kategori
  app.get("/kategori/:id", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
      console.log("Connected to database");
      if (err) {
        console.log("Feil ved kobling til databasen");
        res.json({ error: "feil ved ved oppkobling" });
      } else {
        connection.query(
          "SELECT sak_id, overskrift, ingress, innhold, tidspunkt, bilde, kategori_navn, viktighet, tommelOpp, tommelNed FROM sak join kategori USING(kategori_id) WHERE kategori_id = ? ORDER BY tidspunkt DESC LIMIT 21",
          req.params.id,

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

  // Henter ut en bestemt sak
  app.get("/sak/:sak_id", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
      console.log("Connected to database");
      if (err) {
        console.log("Feil ved kobling til databasen");
        res.json({ error: "feil ved ved oppkobling" });
      } else {
        connection.query(
          "SELECT overskrift, ingress, innhold, tidspunkt, bilde, kategori_navn, kategori_id, viktighet, tommelOpp, tommelNed FROM sak JOIN kategori USING(kategori_id) WHERE sak_id = ?",
          req.params.sak_id,

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
          "SELECT * from sak WHERE overskrift LIKE ? LIMIT 3",
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

  // Registrerer en ny sak
  app.post("/registrerSak", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("Feil ved oppkobling");
        res.json({ error: "feil ved oppkobling" });
      } else {
        console.log("Fikk databasekobling");
        var val = [
          req.body.overskrift,
          req.body.ingress,
          req.body.innhold,
          req.body.bilde,
          req.body.kategori_id,
          req.body.viktighet
        ];
        connection.query(
          "INSERT INTO sak (overskrift, ingress, innhold, bilde, kategori_id, viktighet) VALUES (?,?,?,?,?,?)",
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

  // Sletter en bestemt sak gitt sak_id
  app.delete("/sak/:sak_id", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
      console.log("Connected to database");
      if (err) {
        console.log("Feil ved kobling til databasen");
        res.json({ error: "feil ved ved oppkobling" });
      } else {
        connection.query(
          "DELETE FROM sak WHERE sak_id=?",
          req.params.sak_id,
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

  // Oppdaterer en bestemt sak gitt sak_id
  app.put("/sak/:sak_id", (req, res) => {
    console.log("Fikk PUT-request fra klienten");
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("Feil ved oppkobling");
        res.json({ error: "feil ved oppkobling" });
      } else {
        console.log("Fikk databasekobling");
        var val = [
          req.body.overskrift,
          req.body.ingress,
          req.body.innhold,
          req.body.bilde,
          req.body.kategori_id,
          req.body.viktighet,
          req.params.sak_id
        ];
        connection.query(
          "UPDATE sak SET overskrift=?, ingress=?, innhold=?, bilde=?, kategori_id=?, viktighet=? WHERE sak_id = ?",
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

  // Henter ut kommentarer til en sak
  app.get("/kommentar/:sak_id", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
      console.log("Connected to database");
      if (err) {
        console.log("Feil ved kobling til databasen");
        res.json({ error: "feil ved ved oppkobling" });
      } else {
        connection.query(
          "SELECT kommentar_id, brukernavn, kommentar, kommentar.tidspunkt FROM kommentar JOIN sak USING(sak_id) WHERE sak_id = ?",
          req.params.sak_id,

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

  app.post("/registrerKommentar", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("Feil ved oppkobling");
        res.json({ error: "feil ved oppkobling" });
      } else {
        console.log("Fikk databasekobling");
        var val = [req.body.brukernavn, req.body.kommentar, req.body.sak_id];
        connection.query(
          "INSERT INTO kommentar (brukernavn, kommentar, sak_id) VALUES (?,?,?) ",
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

  // Sletter en bestemt kommentar gitt kommentar_id
  app.delete("/kommentar/:kommentar_id", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
      console.log("Connected to database");
      if (err) {
        console.log("Feil ved kobling til databasen");
        res.json({ error: "feil ved ved oppkobling" });
      } else {
        connection.query(
          "DELETE FROM kommentar WHERE kommentar_id=?",
          req.params.kommentar_id,
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
