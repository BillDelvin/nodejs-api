const connDB = require("./config");

module.exports = {
  todoTable: () => {
    const tableName = "todos";
    connDB.getConnection(async (err, conn) => {
      if (err) throw err;

      try {
        const [checkTabel] = await conn.promise().query(`
            SHOW TABLES LIKE '${tableName}';
        `);

        if (checkTabel.length === 0) {
          await conn.promise().query(`
            CREATE TABLE ${tableName} (
                id VARCHAR(36) NOT NULL UNIQUE PRIMARY KEY,
                todoName CHAR(255) NOT NULL,
                isDone TINYINT NOT NULL
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
