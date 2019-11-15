DROP TABLE IF EXISTS sak;

CREATE TABLE sak  (
  sak_id int(11) NOT NULL AUTO_INCREMENT,
  overskrift varchar(100) NOT NULL,
  innhold text DEFAULT NULL,
  tidspunkt timestamp	CURRENT_TIMESTAMP,
  bilde varchar(500) NOT NULL,
  kategori_id int(2) NOT NULL,
  viktighet int(1) NOT NULL,
  PRIMARY KEY (sak_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
