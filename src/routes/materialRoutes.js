const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');
const { validateCreateMaterial, validateUpdateMaterial } = require('../validators/materialValidator');

// 获取所有物料
router.get('/', materialController.getAllMaterials);

// 获取物料统计信息
router.get('/statistics', materialController.getStockStatistics);

// 获取物料分类列表
router.get('/categories', materialController.getMaterialCategories);

// 根据ID获取物料
router.get('/:id', materialController.getMaterialById);

// 创建物料
router.post('/', validateCreateMaterial, materialController.createMaterial);

// 更新物料
router.put('/:id', validateUpdateMaterial, materialController.updateMaterial);

// 删除物料
router.delete('/:id', materialController.deleteMaterial);

// 批量删除物料
router.delete('/', materialController.deleteMaterials);

module.exports = router; 