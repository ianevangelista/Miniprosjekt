INSERT INTO kategori (kategori_id, kategori_navn) VALUES
    (1, 'Kultur'),
    (2, 'Sport'),
    (3, 'Innenriks'),
    (4, 'Utenriks');


INSERT INTO sak (sak_id, skribent, overskrift, ingress, innhold, tidspunkt, tidspunktEndret, bilde, kategori_id, viktighet, tommelOpp, tommelNed) VALUES
    (1, "Ian", 'Test1', "test", "test", "2019-11-11 20:19:47", "2019-11-11 20:19:47", "bilde", 1, 1, 2, 2),
    (2, "Ian", 'Test2', "test", "test", "2019-11-11 20:19:47", "2019-11-11 20:19:47", "bilde", 2, 1, 3, 3),
    (3, "Ian", 'Test3', "test", "test", "2019-11-11 20:19:47", "2019-11-11 20:19:47", "bilde", 3, 1, 4, 2),
    (4, "Ian", 'Test4', "test", "test", "2019-11-11 20:19:47", "2019-11-11 20:19:47", "bilde", 3, 1, 6, 5),
    (5, "Ian", 'Test5', "test", "test", "2019-11-11 20:19:47", "2019-11-11 20:19:47", "bilde", 4, 2, 9, 1),
    (6, "Ian", 'Test6', "test", "test", "2019-11-11 20:19:47", "2019-11-11 20:19:47", "bilde", 4, 2, 9, 1);




INSERT INTO kommentar (kommentar_id, brukernavn, kommentar, tidspunkt, sak_id) VALUES
    (1, 'dao1', 'dao', '2019-11-22 19:51:58', 1),
    (2, 'dao2', 'dao', '2019-11-22 19:51:58', 2),
    (3, 'dao3', 'dao', '2019-11-22 19:51:58', 3),
    (4, 'dao4', 'dao', '2019-11-22 19:51:58', 6);

