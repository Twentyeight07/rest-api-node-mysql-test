import { Router } from 'express';
import {
  createEmployees,
  deleteEmployees,
  getEmployees,
  getOneEmployee,
  updateEmployees,
} from '../controllers/employees.controller.js';

const router = Router();

router.get('/employees', getEmployees);

router.post('/employees', createEmployees);

router.patch('/employees/:id', updateEmployees);

router.delete('/employees/:id', deleteEmployees);

router.get('/employees/:id', getOneEmployee);

export default router;
