DROP TABLE IF EXISTS sak;
DROP TABLE IF EXISTS kategori;
DROP TABLE IF EXISTS kommentar;


CREATE TABLE kategori  (
  kategori_id int(11) NOT NULL AUTO_INCREMENT,
  kategori_navn varchar(100) NOT NULL,
  PRIMARY KEY (kategori_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE sak  (
  sak_id int(11) NOT NULL AUTO_INCREMENT,
  overskrift varchar(100) NOT NULL,
  ingress varchar(300) NOT NULL,
  innhold text DEFAULT NULL,
  tidspunkt varchar(100),
  bilde varchar(500) NOT NULL,
  kategori_id int(2) NOT NULL,
  viktighet int(1) NOT NULL,
  tommelOpp int(5),
  tommelNed int(5),
  PRIMARY KEY (sak_id),
  FOREIGN KEY (kategori_id) REFERENCES kategori(kategori_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE kommentar  (
  kommentar_id int(11) NOT NULL AUTO_INCREMENT,
  brukernavn varchar(100) NOT NULL,
  kommentar varchar(300) NOT NULL,
  tidspunkt varchar(100),
  sak_id int(2) NOT NULL,
  PRIMARY KEY (kommentar_id),
  ADD CONSTRAINT fk_id
    FOREIGN KEY (sak_id) REFERENCES sak(sak_id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;