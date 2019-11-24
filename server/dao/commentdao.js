const Dao = require("./dao.js");

module.exports = class CommentDao extends Dao {
  // Henter alle kommentarene til en sak
  getOne(id, callback) {
    super.query(
      "SELECT kommentar_id, brukernavn, kommentar, kommentar.tidspunkt FROM kommentar JOIN sak USING(sak_id) WHERE sak_id = ?",
      [id],
      callback
    );
  }

  // Lager en kommentar
  createOne(json, callback) {
    var val = [json.brukernavn, json.kommentar, json.sak_id];
    super.query(
      "INSERT INTO kommentar (brukernavn, kommentar, sak_id) VALUES (?,?,?) ",
      val,
      callback
    );
  }

  // Sletter en kommentar
  deleteOne(id, callback) {
    super.query("DELETE FROM kommentar WHERE kommentar_id=?", [id], callback);
  }
};
