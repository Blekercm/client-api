const pool = require("../utils/db");

const createClient = async (req, res, next) => {
  try {
    const { name, surname, date_birth } = req.body;

    const newTask = await pool.query(
      "INSERT INTO client (name, surname, date_birth) VALUES($1, $2, $3) RETURNING *",
      [name, surname, date_birth]
    );

    res.json(newTask.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getAllClient = async (req, res, next) => {
  try {
    const allTasks = await pool.query("select id, name, surname, date_birth, date_part('year',age(date_birth)) as age from client");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
  }
};

const getClient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("select id, name, surname, date_birth, date_part('year',age(date_birth)) as age from client WHERE id = $1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Client not found" });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, date_birth } = req.body;

    const result = await pool.query(
      "UPDATE client SET name = $1, surname = $2, date_birth = $3 WHERE id = $4 RETURNING *",
      [name, surname, date_birth, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Client not found" });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM client WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({ message: "Client not found" });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createClient,
  getAllClient,
  getClient,
  updateClient,
  deleteClient,
};
