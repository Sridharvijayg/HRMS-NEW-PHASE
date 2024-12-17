const express = require('express');
const router = express.Router();
const departmentController = require('../Controllers/departmentController');

router.use(express.urlencoded({extended:false}));
router.use(express.json());

router.get('/search',departmentController.SearchDepartment);
router.get('/',departmentController.getAllDepartment);
router.post('/',departmentController.addDepartment);
router.get('/:id',departmentController.getOneDepartment);
router.put('/:id',departmentController.updateDepartment);
router.delete('/:id',departmentController.deleteDepartment);

module.exports = router;    