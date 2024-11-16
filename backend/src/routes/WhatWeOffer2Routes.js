// src/routes/WhatWeOffer2Routes.js
const express = require('express');
const router = express.Router();
const WhatWeOffer2 = require('../models/WhatWeOffer2');

// جلب جميع البرامج
router.get('/', async (req, res) => {
  try {
    const programs = await WhatWeOffer2.find();
    console.log('Fetched programs:', programs); // للتأكد من البيانات
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ message: 'Error fetching programs' });
  }
});

// جلب برنامج محدد
router.get('/:id', async (req, res) => {
  try {
    const program = await WhatWeOffer2.findById(req.params.id);
    console.log('Fetched program:', program); // للتأكد من البيانات
    
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    
    res.json(program);
  } catch (error) {
    console.error('Error fetching program:', error);
    res.status(500).json({ message: 'Error fetching program' });
  }
});

// التسجيل في برنامج
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, programId } = req.body;

    // التحقق من وجود البرنامج
    const program = await WhatWeOffer2.findById(programId);
    if (!program) {
      return res.status(404).json({ message: 'البرنامج غير موجود' });
    }

    // إنشاء تسجيل جديد
    const registration = {
      name,
      email,
      phone,
      programId,
      status: 'pending',
      createdAt: new Date()
    };

    // هنا يمكنك حفظ التسجيل في قاعدة البيانات
    // const savedRegistration = await Registration.create(registration);

    res.status(201).json({
      success: true,
      message: 'تم التسجيل بنجاح',
      registration: registration
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'حدث خطأ في التسجيل' });
  }
});

// معالجة الدفع
router.post('/process-payment', async (req, res) => {
  try {
    const { paymentId, registrationId } = req.body;

    // هنا يمكنك تحديث حالة التسجيل بعد الدفع
    // await Registration.findByIdAndUpdate(registrationId, { status: 'paid' });

    res.json({
      success: true,
      message: 'تم معالجة الدفع بنجاح'
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ message: 'حدث خطأ في معالجة الدفع' });
  }
});

module.exports = router;
