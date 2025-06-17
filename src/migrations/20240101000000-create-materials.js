'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('materials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        comment: '物料编码',
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: '物料名称',
      },
      category: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: '物料分类',
      },
      specification: {
        type: Sequelize.STRING(200),
        allowNull: true,
        comment: '规格型号',
      },
      unit: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: '计量单位',
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        comment: '单价',
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '库存数量',
      },
      min_stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '最小库存',
      },
      max_stock: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: '最大库存',
      },
      supplier: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: '供应商',
      },
      location: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: '存放位置',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: '描述',
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
        comment: '状态',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // 添加索引
    await queryInterface.addIndex('materials', ['code'], {
      unique: true,
    });
    await queryInterface.addIndex('materials', ['category']);
    await queryInterface.addIndex('materials', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('materials');
  },
}; 