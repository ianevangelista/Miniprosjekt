var mysql = require("mysql");

const CommentDao = require("./commentdao.js");
const runsqlfile = require("./runsqlfile.js");

// GitLab CI Pool
var pool = mysql.createPool({
  connectionLimit: 1,
  host: "mysql",
  user: "root",
  password: "secret",
  database: "supertestdb",
  debug: false,
  multipleStatements: true
});

let commentDao = new CommentDao(pool);

beforeAll(done => {
  runsqlfile("tests/create_tables.sql", pool, () => {
    runsqlfile("tests/create_testdata.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});

test("Get all comments from a news from DB", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBeGreaterThanOrEqual(2);
    done();
  }

  commentDao.getBreakingNews(callback);
});

test("Add news to DB", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  commentDao.createOne(
    {
      brukernavn: "bruker",
      kommentar: "en kommentar",
      sak_id: 2
    },
    callback
  );
});

test("Delete one news from DB", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data.length=" + data.length
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  commentDao.deleteOne(4, callback);
});