const Joi = require('joi');

const createMaterialSchema = Joi.object({
  code: Joi.string().max(50).required().messages({
    'string.empty': '物料编码不能为空',
    'string.max': '物料编码长度不能超过50个字符',
    'any.required': '物料编码是必填项'
  }),
  name: Joi.string().max(100).required().messages({
    'string.empty': '物料名称不能为空',
    'string.max': '物料名称长度不能超过100个字符',
    'any.required': '物料名称是必填项'
  }),
  category: Joi.string().max(50).required().messages({
    'string.empty': '物料分类不能为空',
    'string.max': '物料分类长度不能超过50个字符',
    'any.required': '物料分类是必填项'
  }),
  specification: Joi.string().max(200).optional().allow('').messages({
    'string.max': '规格型号长度不能超过200个字符'
  }),
  unit: Joi.string().max(20).required().messages({
    'string.empty': '计量单位不能为空',
    'string.max': '计量单位长度不能超过20个字符',
    'any.required': '计量单位是必填项'
  }),
  price: Joi.number().precision(2).min(0).optional().allow(null).messages({
    'number.base': '单价必须是数字',
    'number.min': '单价不能为负数',
    'number.precision': '单价最多保留2位小数'
  }),
  stock: Joi.number().integer().min(0).default(0).messages({
    'number.base': '库存数量必须是数字',
    'number.integer': '库存数量必须是整数',
    'number.min': '库存数量不能为负数'
  }),
  minStock: Joi.number().integer().min(0).default(0).messages({
    'number.base': '最小库存必须是数字',
    'number.integer': '最小库存必须是整数',
    'number.min': '最小库存不能为负数'
  }),
  maxStock: Joi.number().integer().min(0).optional().allow(null).messages({
    'number.base': '最大库存必须是数字',
    'number.integer': '最大库存必须是整数',
    'number.min': '最大库存不能为负数'
  }),
  supplier: Joi.string().max(100).optional().allow('').messages({
    'string.max': '供应商名称长度不能超过100个字符'
  }),
  location: Joi.string().max(100).optional().allow('').messages({
    'string.max': '存放位置长度不能超过100个字符'
  }),
  description: Joi.string().optional().allow('').messages({
    'string.base': '描述必须是字符串'
  }),
  status: Joi.string().valid('active', 'inactive').default('active').messages({
    'any.only': '状态只能是active或inactive'
  })
});

const updateMaterialSchema = Joi.object({
  code: Joi.string().max(50).optional().messages({
    'string.max': '物料编码长度不能超过50个字符'
  }),
  name: Joi.string().max(100).optional().messages({
    'string.max': '物料名称长度不能超过100个字符'
  }),
  category: Joi.string().max(50).optional().messages({
    'string.max': '物料分类长度不能超过50个字符'
  }),
  specification: Joi.string().max(200).optional().allow('').messages({
    'string.max': '规格型号长度不能超过200个字符'
  }),
  unit: Joi.string().max(20).optional().messages({
    'string.max': '计量单位长度不能超过20个字符'
  }),
  price: Joi.number().precision(2).min(0).optional().allow(null).messages({
    'number.base': '单价必须是数字',
    'number.min': '单价不能为负数',
    'number.precision': '单价最多保留2位小数'
  }),
  stock: Joi.number().integer().min(0).optional().messages({
    'number.base': '库存数量必须是数字',
    'number.integer': '库存数量必须是整数',
    'number.min': '库存数量不能为负数'
  }),
  minStock: Joi.number().integer().min(0).optional().messages({
    'number.base': '最小库存必须是数字',
    'number.integer': '最小库存必须是整数',
    'number.min': '最小库存不能为负数'
  }),
  maxStock: Joi.number().integer().min(0).optional().allow(null).messages({
    'number.base': '最大库存必须是数字',
    'number.integer': '最大库存必须是整数',
    'number.min': '最大库存不能为负数'
  }),
  supplier: Joi.string().max(100).optional().allow('').messages({
    'string.max': '供应商名称长度不能超过100个字符'
  }),
  location: Joi.string().max(100).optional().allow('').messages({
    'string.max': '存放位置长度不能超过100个字符'
  }),
  description: Joi.string().optional().allow('').messages({
    'string.base': '描述必须是字符串'
  }),
  status: Joi.string().valid('active', 'inactive').optional().messages({
    'any.only': '状态只能是active或inactive'
  })
});

const validateCreateMaterial = (req, res, next) => {
  const { error } = createMaterialSchema.validate(req.body);
  if (error) {
    error.isJoi = true;
    return next(error);
  }
  next();
};

const validateUpdateMaterial = (req, res, next) => {
  const { error } = updateMaterialSchema.validate(req.body);
  if (error) {
    error.isJoi = true;
    return next(error);
  }
  next();
};

module.exports = {
  validateCreateMaterial,
  validateUpdateMaterial
}; 