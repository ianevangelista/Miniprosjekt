INSERT INTO `kategori` (`kategori_id`, `kategori_navn`) VALUES
(1, 'Kultur'),
(2, 'Sport'),
(3, 'Innenriks'),
(4, 'Utenriks');


INSERT INTO `sak` (`sak_id`, `skribent`, `overskrift`, `ingress`, `innhold`, `tidspunkt`, `tidspunktEndret`, `bilde`, `kategori_id`, `viktighet`, `tommelOpp`, `tommelNed`) VALUES
(1, 'Ian Evangelista', 'Nikolai og Kasper kjøpte rekordantall med sko', 'Nikolai og Kasper kjøpte rekordantall med sko', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\r\n\r\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', '2019-09-09 07:55:47', '2019-11-22 20:47:37', 'https://thenypost.files.wordpress.com/2018/06/men-shopping-masculine.jpg?quality=90&strip=all&w=618&h=410&crop=1', 1, 1, NULL, NULL),
(2, 'Ian Evangelista', 'Manchester United vant Premier League', 'Manchester United vant Premier League', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\r\n\r\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\r\n', '2019-09-09 07:58:03', '2019-11-22 20:47:37', 'https://pbs.twimg.com/media/CcIIVNWUcAENe5W.jpg', 2, 1, NULL, NULL),
(3, 'Ian Evangelista', 'Norge vinner VM', 'Norge vinner VM', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2019-10-29 08:50:42', '2019-11-22 20:47:37', 'https://g.acdn.no/obscura/API/dynamic/r1/nadp/tr_1500_2000_s_f/0000/2019/10/12/3423860834/1/original/10960289.jpg?chk=75EE57', 2, 1, NULL, NULL),
(4, 'Ian Evangelista', 'Ødegaard blir verdens dyreste fotballspiller', 'Ødegaard blir verdens dyreste fotballspiller', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2019-10-29 08:50:42', '2019-11-22 20:47:37', 'https://ap.mnocdn.no/images/751ce4c3-3e31-4d97-9a82-88295f73d5d1?fit=crop&q=80&w=1440', 2, 1, NULL, NULL);


INSERT INTO `kommentar` (`kommentar_id`, `brukernavn`, `kommentar`, `tidspunkt`, `sak_id`) VALUES
(15, 'dao1', 'dao', '2019-11-22 19:51:58', 1),
(16, 'dao2', 'dao', '2019-11-22 19:51:58', 2),
(17, 'dao3', 'dao', '2019-11-22 19:51:58', 3);
