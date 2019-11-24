const Dao = require("./dao.js");

module.exports = class NewsDao extends Dao {
  // Henter nyeste og viktigste saker
  getBreakingNews(callback) {
    super.query(
      "SELECT sak_id, skribent, overskrift, ingress, innhold, tidspunkt, tidspunktEndret, bilde, kategori_navn, viktighet, tommelOpp, tommelNed FROM sak join kategori USING(kategori_id) WHERE viktighet = 1 ORDER BY tidspunkt DESC LIMIT 22",
      [],
      callback
    );
  }

  // Henter de fem nyeste sakene uansett viktighet
  getLatestNews(callback) {
    super.query(
      "SELECT sak_id, overskrift, tidspunkt FROM sak JOIN kategori USING(kategori_id) ORDER BY tidspunkt DESC LIMIT 5",
      [],
      callback
    );
  }

  // Henter en sak
  getOne(id, callback) {
    super.query(
      "SELECT skribent, overskrift, ingress, innhold, tidspunkt, tidspunktEndret, bilde, kategori_navn, kategori_id, viktighet, tommelOpp, tommelNed FROM sak JOIN kategori USING(kategori_id) WHERE sak_id = ?",
      [id],
      callback
    );
  }

  // Henter sakene basert på overskrift
  getByTitle(title, callback) {
    super.query(
      "SELECT * from sak WHERE overskrift LIKE ? LIMIT 5",
      "%" + [title] + "%",
      callback
    );
  }

  // Lager en sak
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

  // Oppdaterer en sak
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

  // Sletter en sak
  deleteOne(id, callback) {
    super.query("DELETE FROM sak WHERE sak_id=?", [id], callback);
  }

  // Oppdaterer en saks rating
  updateRating(json, callback) {
    var val = [json.tommelOpp, json.tommelNed, json.sak_id];
    super.query(
      "UPDATE sak SET tommelOpp=?, tommelNed=? WHERE sak_id = ?",
      val,
      callback
    );
  }
};
