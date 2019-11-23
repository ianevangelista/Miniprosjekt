INSERT INTO kategori (kategori_id, kategori_navn) VALUES
(1, 'Kultur'),
(2, 'Sport'),
(3, 'Innenriks'),
(4, 'Utenriks');


INSERT INTO sak (sak_id, skribent, overskrift, ingress, innhold, tidspunkt, tidspunktEndret, bilde, kategori_id, viktighet, tommelOpp, tommelNed) VALUES
(1, 'Ian Evangelista', 'Nikolai og Kasper kjøpte rekordantall med sko', 'Nikolai og Kasper kjøpte rekordantall med sko', "a galley of type and scrambled it to make a type", '2019-09-09 07:55:47', '2019-11-22 20:47:37', 'https://thenypost.files.wordpress.com/2018/06/men-shopping-masculine.jpg?quality=90&strip=all&w=618&h=410&crop=1', 1, 1, NULL, NULL),
(2, 'Ian Evangelista', 'Manchester United vant Premier League', 'Manchester United vant Premier League', 'Latin professor at Hampden-Sydney College in Virginia, looked st line of Lorem Ips the 1914', '2019-09-09 07:58:03', '2019-11-22 20:47:37', 'https://pbs.twimg.com/media/CcIIVNWUcAENe5W.jpg', 2, 1, NULL, NULL),
(3, 'Ian Evangelista', 'Norge vinner VM', 'Norge vinner VM', 'It wass of Lorem Ipsum.', '2019-10-29 08:50:42', '2019-11-22 20:47:37', 'https://g.acdn.no/obscura/API/dynamic/r1/nadp/tr_1500_2000_s_f/0000/2019/10/12/3423860834/1/original/10960289.jpg?chk=75EE57', 2, 1, NULL, NULL),
(4, 'Ian Evangelista', 'Ødegaard blir verdens dyreste fotballspiller', 'Ødegaard blir verdens dyreste fotballspiller', 'Lorem typesetting, It was popularised in the 1960s with the release of Letrasetpsum.', '2019-10-29 08:50:42', '2019-11-22 20:47:37', 'https://ap.mnocdn.no/images/751ce4c3-3e31-4d97-9a82-88295f73d5d1?fit=crop&q=80&w=1440', 2, 1, NULL, NULL);


INSERT INTO kommentar (kommentar_id, brukernavn, kommentar, tidspunkt, sak_id) VALUES
(15, 'dao1', 'dao', '2019-11-22 19:51:58', 1),
(16, 'dao2', 'dao', '2019-11-22 19:51:58', 2),
(17, 'dao3', 'dao', '2019-11-22 19:51:58', 3);
