const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Sequelize 错误处理
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: '数据验证失败',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      success: false,
      message: '数据已存在',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }

  if (err.name === 'SequelizeDatabaseError') {
    return res.status(500).json({
      success: false,
      message: '数据库错误',
      error: process.env.NODE_ENV === 'development' ? err.message : '内部服务器错误'
    });
  }

  // Joi 验证错误
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      message: '请求参数验证失败',
      errors: err.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }

  // 默认错误处理
  const statusCode = err.statusCode || 500;
  const message = err.message || '内部服务器错误';

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler; 