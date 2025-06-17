'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    static associate(models) {
      // 定义关联关系
    }
  }
  
  Material.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        comment: '物料编码',
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '物料名称',
      },
      category: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '物料分类',
      },
      specification: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '规格型号',
      },
      unit: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '计量单位',
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: '单价',
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '库存数量',
      },
      minStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '最小库存',
      },
      maxStock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '最大库存',
      },
      supplier: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: '供应商',
      },
      location: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: '存放位置',
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '描述',
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
        comment: '状态',
      },
    },
    {
      sequelize,
      modelName: 'Material',
      tableName: 'materials',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['code'],
        },
        {
          fields: ['category'],
        },
        {
          fields: ['status'],
        },
      ],
    }
  );
  
  return Material;
}; 