import { pool } from '../db.js';

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees');

    res.send(rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong :(',
    });
  }
};

export const createEmployees = async (req, res) => {
  try {
    const { name, lastname, salary } = req.body;
    const [rows] = await pool.query(
      'INSERT INTO employees(name, lastname, salary) VALUES (?, ?, ?)',
      [name, lastname, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      lastname,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong :(',
    });
  }
};

export const updateEmployees = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, salary } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE employees SET name = IFNULL(?, name), lastname = IFNULL(?, lastname), salary = IFNULL(?, salary) WHERE id = ?',
      [name, lastname, salary, Number(id)]
    );

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: 'Employee not found :(',
      });

    const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong :(',
    });
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM employees WHERE id = ?', [
      Number(req.params.id),
    ]);

    if (result.affectedRows < 0)
      return res.status(404).json({
        message: 'Employee not found! :(',
      });

    console.log(result);

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong :(',
    });
  }
};

export const getOneEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [
      Number(id),
    ]);

    if (rows.length <= 0)
      return res.status(404).json({ message: 'employee not found :(' });

    res.send(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong :(',
    });
  }
};
