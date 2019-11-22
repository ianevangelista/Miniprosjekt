INSERT INTO kategori(kategori_id, kategori_navn) VALUES
    (1, "Kultur"),
    (2, "Sport"),
    (3, "Innenriks"),
    (4, "Utenriks");


INSERT INTO sak (sak_id, overskrift, ingress, innhold, tidspunkt, bilde, kategori_id, viktighet, tommelOpp, tommelNed) VALUES
    (1, 'Test1', "test", "test", "2019-11-11 20:19:47", "bilde", 1, 1, 2, 2),
    (2, 'Test2', "test", "test", "2019-11-11 20:19:47", "bilde", 2, 1, 3, 3),
    (3, 'Test3', "test", "test", "2019-11-11 20:19:47", "bilde", 3, 1, 4, 2),
    (4, 'Test4', "test", "test", "2019-11-11 20:19:47", "bilde", 3, 1, 6, 5),
    (5, 'Test5', "test", "test", "2019-11-11 20:19:47", "bilde", 4, 2, 9, 1);


INSERT INTO kommentar(kommentar_id, brukernavn, kommentar, sak_id) VALUES
    (1, "bruker1", "kommentar1", 1),
    (2, "bruker2", "kommentar2", 1),
    (3, "bruker3", "kommentar3", 3),
    (4, "bruker4", "kommentar4", 4);
