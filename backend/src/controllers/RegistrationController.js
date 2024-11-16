const Registration = require('../models/Registration');

exports.createRegistration = async (req, res) => {
  try {
    const { name, phone, programName, programPrice } = req.body;
    const userId = req.user.id;

    // إنشاء تسجيل جديد
    const newRegistration = new Registration({
      userId,
      name,
      phone,
      programName,
      programPrice
    });

    await newRegistration.save();
    res.status(201).json({ 
      message: 'تم التسجيل بنجاح',
      registration: newRegistration 
    });

  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ في التسجيل' });
  }
};

exports.getUserRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ userId: req.user.id });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ في جلب التسجيلات' });
  }
};