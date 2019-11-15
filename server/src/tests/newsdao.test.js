var mysql = require("mysql");

const NewsDao = require("./newsdao.js");
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

let newsDao = new NewsDao(pool);

beforeAll(done => {
  runsqlfile("tests/create_tables.sql", pool, () => {
    runsqlfile("tests/create_testdata.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});

test("Get one news from DB", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    expect(data[0].overskrift).toBe("Test");
    done();
  }

  personDao.getOne(1, callback);
});

test("get unknown person from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(0);
    done();
  }

  personDao.getOne(0, callback);
});

test("add person to db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  personDao.createOne(
    { navn: "Nils Nilsen", alder: 34, adresse: "Gata 3" },
    callback
  );
});

test("get all persons from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data.length=" + data.length
    );
    expect(data.length).toBeGreaterThanOrEqual(2);
    done();
  }

  personDao.getAll(callback);
});

test("delete one person from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data.length=" + data.length
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  personDao.deleteOne(1, callback);
});

test("update one person from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" +
        status +
        ", data.length=" +
        JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  personDao.updateOne(
    { navn: "Ian Evangelista", alder: 20, adresse: "Trondheim", id: 2 },
    callback
  );
});
