const Contact = require('../models/contactModel');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const contactController = {
  // إنشاء رسالة جديدة
  createContact: async (req, res) => {
    try {
      console.log('Received request body:', req.body);
      
      const { name, email, phone, subject, message } = req.body;
      
      // التحقق من البيانات
      if (!name || !email || !phone || !subject || !message) {
        return res.status(400).json({
          success: false,
          message: 'جميع الحقول مطلوبة'
        });
      }
      
      // حفظ في قاعدة البيانات
      const newContact = new Contact({
        name,
        email,
        phone,
        subject,
        message
      });
      
      await newContact.save();

      // محاولة إرسال البريد الإلكتروني
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `رسالة جديدة من ${name}: ${subject}`,
          text: `
            اسم المرسل: ${name}
            البريد الإلكتروني: ${email}
            رقم الهاتف: ${phone}
            الموضوع: ${subject}
            الرسالة: ${message}
          `
        });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // نستمر حتى لو فشل إرسال البريد الإلكتروني
      }

      res.status(201).json({
        success: true,
        message: 'تم إرسال رسالتك بنجاح'
      });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({
        success: false,
        message: 'حدث خطأ أثناء إرسال الرسالة',
        error: error.message
      });
    }
  },

  // الحصول على جميع الرسائل (للإدارة)
  getAllContacts: async (req, res) => {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        data: contacts
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'حدث خطأ أثناء جلب الرسائل',
        error: error.message
      });
    }
  }
};

module.exports = contactController; 