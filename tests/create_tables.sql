DROP TABLE IF EXISTS sak;
DROP TABLE IF EXISTS kategori;
DROP TABLE IF EXISTS kommentar;


CREATE TABLE kategori (
  kategori_id int(2) NOT NULL,
  kategori_navn varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE kategori
  ADD PRIMARY KEY (kategori_id);

ALTER TABLE kategori
  MODIFY kategori_id int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;



CREATE TABLE sak (
  sak_id int(5) NOT NULL,
  skribent varchar(100) NOT NULL,
  overskrift varchar(100) NOT NULL,
  ingress varchar(300) NOT NULL,
  innhold text NOT NULL,
  tidspunkt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  tidspunktEndret timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  bilde varchar(500) NOT NULL,
  kategori_id int(2) NOT NULL,
  viktighet int(1) NOT NULL,
  tommelOpp int(11) DEFAULT NULL,
  tommelNed int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE sak
  ADD PRIMARY KEY (sak_id),
  ADD KEY kategori_id (kategori_id);

ALTER TABLE sak
  MODIFY sak_id int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

ALTER TABLE sak
  ADD CONSTRAINT sak_ibfk_1 FOREIGN KEY (kategori_id) REFERENCES kategori (kategori_id);
COMMIT;

CREATE TABLE kommentar (
  kommentar_id int(11) NOT NULL,
  brukernavn varchar(50) NOT NULL,
  kommentar varchar(200) NOT NULL,
  tidspunkt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  sak_id int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE kommentar
  ADD PRIMARY KEY (kommentar_id),
  ADD KEY fk_id (sak_id);

ALTER TABLE kommentar
  MODIFY kommentar_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

ALTER TABLE kommentar
  ADD CONSTRAINT fk_id FOREIGN KEY (sak_id) REFERENCES sak (sak_id) ON DELETE CASCADE,
  ADD CONSTRAINT kommentar_ibfk_1 FOREIGN KEY (sak_id) REFERENCES sak (sak_id);
COMMIT;