const Dao = require("./dao.js");

module.exports = class CategoryDao extends Dao {
  // Henter alle kategorier
  getAll(callback) {
    super.query(
      "SELECT * from kategori ORDER BY kategori_id ASC",
      [],
      callback
    );
  }

  // Henter sakene til en kategori
  getOne(id, callback) {
    super.query(
      "SELECT sak_id, skribent, overskrift, ingress, innhold, tidspunkt, bilde, kategori_navn, viktighet, tommelOpp, tommelNed FROM sak join kategori USING(kategori_id) WHERE kategori_id = ? ORDER BY tidspunkt DESC LIMIT 21",
      [id],
      callback
    );
  }
};
