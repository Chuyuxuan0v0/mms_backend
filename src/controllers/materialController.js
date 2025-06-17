const { Material } = require('../models');
const { Op } = require('sequelize');

// 获取所有物料
const getAllMaterials = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      status,
      sortBy = 'created_at',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    // 搜索条件
    if (search) {
      where[Op.or] = [
        { code: { [Op.like]: `%${search}%` } },
        { name: { [Op.like]: `%${search}%` } },
        { specification: { [Op.like]: `%${search}%` } }
      ];
    }

    if (category) {
      where.category = category;
    }

    if (status) {
      where.status = status;
    }

    const { count, rows } = await Material.findAndCountAll({
      where,
      order: [[sortBy, sortOrder.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// 根据ID获取物料
const getMaterialById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const material = await Material.findByPk(id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: '物料不存在'
      });
    }

    res.json({
      success: true,
      data: material
    });
  } catch (error) {
    next(error);
  }
};

// 创建物料
const createMaterial = async (req, res, next) => {
  try {
    const material = await Material.create(req.body);

    res.status(201).json({
      success: true,
      message: '物料创建成功',
      data: material
    });
  } catch (error) {
    next(error);
  }
};

// 更新物料
const updateMaterial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const material = await Material.findByPk(id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: '物料不存在'
      });
    }

    await material.update(req.body);

    res.json({
      success: true,
      message: '物料更新成功',
      data: material
    });
  } catch (error) {
    next(error);
  }
};

// 删除物料
const deleteMaterial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const material = await Material.findByPk(id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: '物料不存在'
      });
    }

    await material.destroy();

    res.json({
      success: true,
      message: '物料删除成功'
    });
  } catch (error) {
    next(error);
  }
};

// 批量删除物料
const deleteMaterials = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: '请提供要删除的物料ID列表'
      });
    }

    const deletedCount = await Material.destroy({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });

    res.json({
      success: true,
      message: `成功删除 ${deletedCount} 个物料`
    });
  } catch (error) {
    next(error);
  }
};

// 获取物料分类列表
const getMaterialCategories = async (req, res, next) => {
  try {
    const categories = await Material.findAll({
      attributes: [[Material.sequelize.fn('DISTINCT', Material.sequelize.col('category')), 'category']],
      raw: true
    });

    const categoryList = categories.map(item => item.category).filter(Boolean);

    res.json({
      success: true,
      data: categoryList
    });
  } catch (error) {
    next(error);
  }
};

// 获取库存统计
const getStockStatistics = async (req, res, next) => {
  try {
    const totalMaterials = await Material.count();
    const activeMaterials = await Material.count({ where: { status: 'active' } });
    const lowStockMaterials = await Material.count({
      where: {
        stock: {
          [Op.lte]: Material.sequelize.col('min_stock')
        }
      }
    });

    const totalStockValue = await Material.sum('stock', {
      where: {
        price: {
          [Op.ne]: null
        }
      }
    });

    res.json({
      success: true,
      data: {
        totalMaterials,
        activeMaterials,
        lowStockMaterials,
        totalStockValue: totalStockValue || 0
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  deleteMaterials,
  getMaterialCategories,
  getStockStatistics
}; 