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
  runsqlfile("dao/create_tables.sql", pool, () => {
    runsqlfile("dao/create_testdata.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});

test("Get breaking news from DB", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBeGreaterThanOrEqual(3);
    done();
  }

  newsDao.getBreakingNews(callback);
});

test("Get latest news from DB", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(5);
    done();
  }

  newsDao.getLatestNews(callback);
});

test("Get news by title from DB", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    expect(data[0].overskrift).toBe("Test1");
    done();
  }

  newsDao.getByTitle("Test1", callback);
});

test("Get one news from DB", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    expect(data[0].overskrift).toBe("Test1");
    done();
  }

  newsDao.getOne(1, callback);
});

test("Add news to DB", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  newsDao.createOne(
    {
      skribent: "Tester",
      overskrift: "DAO-test",
      ingress: "Ingress",
      innhold: "Dette er en test",
      bilde: "bilde",
      kategori_id: 4,
      viktighet: 1
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

  newsDao.deleteOne(2, callback);
});

test("Update one news from DB", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" +
        status +
        ", data.length=" +
        JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }

  newsDao.updateOne(
    {
      skribent: "Tester endret",
      overskrift: "DAO-test er endret",
      ingress: "Ingress endret",
      innhold: "Dette er en test som har blitt endret",
      bilde: "bilde",
      kategori_id: 4,
      viktighet: 1,
      sak_id: 4
    },
    callback
  );
});

test("Update one rating to a news from DB", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" +
        status +
        ", data.length=" +
        JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }

  newsDao.updateRating(
    {
      tommelOpp: 9,
      tommelNed: 2,
      sak_id: 6
    },
    callback
  );
});
