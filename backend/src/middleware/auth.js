
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  try {
    // الحصول على التوكن من الهيدر
    const token = req.header('x-auth-token');
    
    // التحقق من وجود التوكن
    if (!token) {
      return res.status(401).json({ message: 'لم يتم توفير رمز المصادقة' });
    }

    // التحقق من صحة التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    
    console.log('Authenticated user:', req.user); // للتأكد من هوية المستخدم
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ 
      message: 'رمز المصادقة غير صالح',
      error: error.message 
    });
  }
};


