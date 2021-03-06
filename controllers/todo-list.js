const connDB = require("../database/config");
const { randomBytes } = require("crypto");

module.exports = {
  created: (req, res) => {
    connDB.getConnection(async (err, conn) => {
      const { todoName, todoDescription } = req.body;

      if (err) throw err;

      try {
        const id = randomBytes(8).toString("hex");

        const [createTodo] = await conn.promise().query(`
          INSERT INTO todos (id, todoName, isDone)
          VALUES ('${id}', '${todoName}', 0)
        `);

        if (createTodo) {
          const idDetail = randomBytes(8).toString("hex");
          const [insertTodoDetail] = await conn.promise().query(`
            INSERT INTO todos_detail (id, todoDescription, todoId)
            VALUES ('${idDetail}', '${todoDescription}', '${id}')
          `);

          if (insertTodoDetail) {
            return res.status(200).json("Created successfully!");
          }
        }
      } catch (error) {
        console.log(error);
        return res.status(400).json("Something went wrong!");
      }
    });
  },
  getAll: (req, res) => {
    connDB.getConnection(async (err, conn) => {
      if (err) throw err;

      try {
        const [getTodos] = await conn.promise().query(`
          SELECT 
            t.id, t.todoName,
            td.id as todoDetailId, td.todoDescription
          FROM todos t
          LEFT JOIN todos_detail td ON t.id = td.todoId;
        `);

        if (getTodos) {
          return res.status(200).json({ data: getTodos });
        }
      } catch (error) {
        return res.status(400).json("Something went wrong!");
      }
    });
  },
  updated: (req, res) => {
    connDB.getConnection(async (err, conn) => {
      const { todoId } = req.params;
      const { todoName, isDone } = req.body;

      if (err) throw err;

      try {
        const [updateTodos] = await conn.promise().query(`
          UPDATE todos SET todoName = '${todoName}', isDone = ${isDone} WHERE id = '${todoId}';
        `);

        if (updateTodos) {
          return res.status(200).json("Updated successfully!");
        }
      } catch (error) {
        console.log(error);
        return res.status(400).json("Something went wrong!");
      }
    });
  },
  deleted: (req, res) => {
    connDB.getConnection(async (err, conn) => {
      const { todoId } = req.params;

      if (err) throw err;

      try {
        const [deleteTodos] = await conn.promise().query(`
         DELETE FROM todos WHERE id = '${todoId}';
        `);

        if (deleteTodos) {
          return res.status(200).json("Deleted successfully!");
        }
      } catch (error) {
        console.log(error);
        return res.status(400).json("Something went wrong!");
      }
    });
  },
};
