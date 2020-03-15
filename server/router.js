module.exports = function(app, pool, newsDao, categoryDao, commentDao) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    next();
  });

  // Henter ut alle sakene med viktighet 1
  app.get("/", (req, res) => {
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

  // Henter de fem siste nyhetene uansett viktighet
  app.get("/sisteNyheter", (req, res) => {
    console.log(": fikk request fra klient");
    newsDao.getLatestNews((status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  // Henter alle kategoriene
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
    console.log("/sok/:overskrift: fikk request fra klient");
    newsDao.getByTitle(req.params.overskrift, (status, data) => {
      res.status(status);
      res.json(data);
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

  // Lager en kommentar
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
    newsDao.updateRating(req.body, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });
};
