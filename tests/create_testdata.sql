INSERT INTO kategori(kategori_id, kategori_navn) VALUES
    (1, "Kultur"),
    (2, "Sport"),
    (3, "Innenriks"),
    (4, "Utenriks");


INSERT INTO sak (sak_id, overskrift, innhold, tidspunkt, bilde, kategori_id, viktighet) VALUES
    (1, 'Test1', "test", "2019-11-11 20:19:47", "bilde", 1, 1),
    (2, 'Test2', "test", "2019-11-11 20:19:47", "bilde", 2, 1),
    (3, 'Test3', "test", "2019-11-11 20:19:47", "bilde", 3, 1),
    (4, 'Test4', "test", "2019-11-11 20:19:47", "bilde", 3, 1),
    (5, 'Test5', "test", "2019-11-11 20:19:47", "bilde", 4, 2);
