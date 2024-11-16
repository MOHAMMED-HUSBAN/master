// سكريبت لإضافة بيانات تجريبية
const WhatWeOffer2 = require('../src/models/WhatWeOffer2');

const testProgram = new WhatWeOffer2({
  name: "Kids Martial Arts",
  description: "برنامج الفنون القتالية للأطفال",
  price: "50",
  image: "url_to_image"
});

testProgram.save()
  .then(() => console.log('تم إضافة البرنامج بنجاح'))
  .catch(err => console.error('خطأ في إضافة البرنامج:', err));