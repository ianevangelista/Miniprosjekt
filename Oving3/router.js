module.exports = function(app, pool){

        // Henter ut alle sakene
    app.get("/sak", (req, res) => {
        console.log("Fikk request fra klient");
        pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
            "select overskrift, innhold, tidspunkt, bilde, kategori_navn from sak join kategori using(kategori_id)",

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
                "select overskrift, innhold, tidspunkt, bilde, kategori_navn from sak join kategori using(kategori_id) where sak_id = ?", req.params.sak_id,

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

    // Henter ut saker gitt en bestemt viktighet
    app.get("/sak/viktighet/:nr", (req, res) => {
        console.log("Fikk request fra klient");
        pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "select overskrift, innhold, tidspunkt, bilde, kategori_navn from sak join kategori using(kategori_id) where viktighet = ?", req.params.nr,

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
    app.post("/sak", (req, res) => {
        console.log("Fikk POST-request fra klienten");
        pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            var val = [req.body.overskrift, req.body.innhold, req.body.bilde, req.body.kategori_id, req.body.viktighet];
            connection.query(
            "insert into sak (overskrift, innhold, bilde, kategori_id, viktighet) values (?,?,?,?,?)", val,
            err => {
                if (err) {
                    console.log(err);
                    res.status(500);
                    res.json({ error: "Feil ved insert" });
                } 
                else {
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
                "delete from sak where sak_id=?", req.params.sak_id,
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
        } 
        else {
            console.log("Fikk databasekobling");
            var val = [req.body.overskrift, req.body.innhold, req.body.bilde, req.body.kategori_id, req.body.viktighet, req.params.sak_id];
            connection.query(
                "update sak SET overskrift=?, innhold=?, bilde=?, kategori_id=?, viktighet=? WHERE sak_id = ?", val,
                err => {
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } 
                    else {
                        console.log("insert ok");
                        res.send("");
                    }
                }
            );
        }
        });
    });
}