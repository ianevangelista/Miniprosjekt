const Dao = require("./dao.js");

module.exports = class NewsDao extends Dao {
  getBreakingNews(callback) {
    super.query(
      "SELECT sak_id, skribent, overskrift, ingress, innhold, tidspunkt, tidspunktEndret, bilde, kategori_navn, viktighet, tommelOpp, tommelNed FROM sak join kategori USING(kategori_id) WHERE viktighet = 1 ORDER BY tidspunkt DESC LIMIT 22",
      [],
      callback
    );
  }

  getOne(id, callback) {
    super.query(
      "SELECT skribent, overskrift, ingress, innhold, tidspunkt, tidspunktEndret, bilde, kategori_navn, kategori_id, viktighet, tommelOpp, tommelNed FROM sak JOIN kategori USING(kategori_id) WHERE sak_id = ?",
      [id],
      callback
    );
  }

  createOne(json, callback) {
    var val = [
      json.skribent,
      json.overskrift,
      json.ingress,
      json.innhold,
      json.bilde,
      json.kategori_id,
      json.viktighet
    ];
    super.query(
      "INSERT INTO sak (skribent, overskrift, ingress, innhold, bilde, kategori_id, viktighet) VALUES (?,?,?,?,?,?,?)",
      val,
      callback
    );
  }

  updateOne(json, callback) {
    var val = [
      json.skribent,
      json.overskrift,
      json.ingress,
      json.innhold,
      json.bilde,
      json.kategori_id,
      json.viktighet,
      json.sak_id
    ];
    super.query(
      "UPDATE sak SET skribent=?, overskrift=?, ingress=?, innhold=?, bilde=?, kategori_id=?, viktighet=?, tidspunktEndret=CURRENT_TIMESTAMP WHERE sak_id = ?",
      val,
      callback
    );
  }

  deleteOne(id, callback) {
    super.query("DELETE FROM sak WHERE sak_id=?", [id], callback);
  }
};
