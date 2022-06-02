const connDB = require("./config");

const todosTable = "todos";
const todosDetailTable = "todos_detail";

module.exports = {
  todoTable: () => {
    connDB.getConnection(async (err, conn) => {
      if (err) throw err;

      try {
        const [checkTabel] = await conn.promise().query(`
            SHOW TABLES LIKE '${todosTable}';
        `);

        if (checkTabel.length === 0) {
          await conn.promise().query(`
            CREATE TABLE ${todosTable} (
                id VARCHAR(36) NOT NULL UNIQUE PRIMARY KEY,
                todoName CHAR(255) NOT NULL,
                isDone TINYINT NOT NULL
            )
          `);
        }

        conn.release();
      } catch (error) {
        conn.release();
      }
    });
  },
  todoDetailTable: () => {
    connDB.getConnection(async (err, conn) => {
      if (err) throw err;

      try {
        const [checkTabel] = await conn.promise().query(`
            SHOW TABLES LIKE '${todosDetailTable}';
        `);

        if (checkTabel.length === 0) {
          await conn.promise().query(`
            CREATE TABLE ${todosDetailTable} (
              id VARCHAR(36) NOT NULL UNIQUE PRIMARY KEY,
              todoDescription CHAR(255) NOT NULL,
              todoId VARCHAR(36) NOT NULL,
              CONSTRAINT todosDetail_ibfk_1 FOREIGN KEY (todoId) REFERENCES ${todosTable}(id)
            )
          `);
        }

        conn.release();
      } catch (error) {
        console.log(error);
        conn.release();
      }
    });
  },
};
