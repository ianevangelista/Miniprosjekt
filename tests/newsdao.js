const Dao = require("./dao.js");

module.exports = class NewsDao extends Dao {
  getBreakingNews(callback) {
    super.query(
      "SELECT sak_id, overskrift, innhold, tidspunkt, bilde, kategori_navn, viktighet FROM sak join kategori USING(kategori_id) WHERE viktighet = 1 ORDER BY tidspunkt DESC LIMIT 22",
      [],
      callback
    );
  }

  getOne(id, callback) {
    super.query(
      "SELECT overskrift, innhold, tidspunkt, bilde, kategori_navn, viktighet FROM sak JOIN kategori USING(kategori_id) WHERE sak_id = ?",
      [id],
      callback
    );
  }

  createOne(json, callback) {
    var val = [
      json.overskrift,
      json.innhold,
      json.bilde,
      json.kategori_id,
      json.viktighet
    ];
    super.query(
      "INSERT INTO sak (overskrift, innhold, bilde, kategori_id, viktighet) values (?,?,?,?,?)",
      val,
      callback
    );
  }

  updateOne(json, callback) {
    var val = [
      json.overskrift,
      json.innhold,
      json.bilde,
      json.kategori_id,
      json.viktighet,
      json.sak_id
    ];
    super.query(
      "UPDATE sak SET overskrift=?, innhold=?, bilde=?, kategori_id=?, viktighet=? WHERE sak_id = ?",
      val,
      callback
    );
  }

  deleteOne(id, callback) {
    super.query("DELETE FROM sak WHERE sak_id=?", [id], callback);
  }
};
