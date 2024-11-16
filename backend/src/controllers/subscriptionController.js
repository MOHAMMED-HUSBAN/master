const Subscription = require('../models/Subscription');
const Program = require('../models/Program');

exports.createSubscription = async (req, res) => {
  try {
    const { programId } = req.body;
    const userId = req.user.id; // من middleware المصادقة

    // التحقق من وجود البرنامج
    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ message: 'البرنامج غير موجود' });
    }

    // حساب تاريخ انتهاء الاشتراك (مثال: شهر واحد)
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + program.duration);

    // إنشاء اشتراك جديد
    const subscription = new Subscription({
      userId,
      programId,
      endDate,
      amount: program.price
    });

    await subscription.save();

    res.status(201).json({
      success: true,
      subscription,
      message: 'تم إنشاء الاشتراك بنجاح'
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ message: 'حدث خطأ في إنشاء الاشتراك' });
  }
};

exports.processPayment = async (req, res) => {
  try {
    const { subscriptionId, paymentId } = req.body;

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: 'الاشتراك غير موجود' });
    }

    subscription.paymentStatus = 'completed';
    subscription.paymentId = paymentId;
    await subscription.save();

    res.json({
      success: true,
      message: 'تم معالجة الدفع بنجاح'
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ message: 'حدث خطأ في معالجة الدفع' });
  }
};

exports.getUserSubscriptions = async (req, res) => {
  try {
    const userId = req.user.id;
    const subscriptions = await Subscription.find({ userId })
      .populate('programId')
      .sort('-createdAt');

    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ message: 'حدث خطأ في جلب الاشتراكات' });
  }
}; 