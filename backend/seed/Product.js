const mongoose = require('mongoose');
const Product = require('../src/models/Product');  // تأكد من المسار الصحيح لنموذج Product

// الاتصال بقاعدة البيانات
mongoose.connect('mongodb+srv://mohammedalhusban1:tm12YmQqa6YnhVbk@academy.5zogf.mongodb.net/academy?retryWrites=true&w=majority&appName=academy', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// البيانات التي سيتم إدخالها
const products =[
          {
            "id": 1,
            "name": "'Tempo' Taekwondo Training Shoes - White/Black",
            "price": 20.00,
            "description": "High-quality training shoes for taekwondo practitioners",
            "image": "https://www.2tuf2tap.com/cdn/shop/products/36_1160x_crop_center.jpg?v=1671120738",
            "category": "Shoes"
          },
          {
            "id": 2,
            "name": "'Vintage' Taekwondo Dobok Uniform - Black/Yellow",
            "price": 30.00,
            "description": "Classic dobok uniform for taekwondo enthusiasts",
            "image": "https://www.2tuf2tap.com/cdn/shop/products/15kD_UVMS8N2cUrL_SpUm3Iiivsj_Sw2g_1160x_crop_center.jpg?v=1666996309",
            "category": "Uniforms"
          },
          {
            "id": 3,
            "name": "'Shield-11' Taekwondo Groin Guard - Male - White/Black",
            "price": 15.00,
            "description": "Protective groin guard for taekwondo training and competition",
            "image": "https://www.2tuf2tap.com/cdn/shop/products/10rNaR47CiRgfA-af_XMA7aLMSb7TJVmc_1160x_crop_center.jpg?v=1666997843",
            "category": "Protective Gear"
          },
          {
            "id": 4,
            "name": "'Shield-11' Taekwondo Foot Guards - White/Black",
            "price": 15.00,
            "description": "Protective foot guards for taekwondo training and competition",
            "image": "https://www.2tuf2tap.com/cdn/shop/products/10Z7ANB54arPjTGagRj-saRNgEF2HimKL_1160x_crop_center.jpg?v=1666997795",
            "category": "Protective Gear"
          },
          {
            "id": 5,
            "name": "'Shield-11' Taekwondo Gloves - White/Black",
            "price": 15.00,
            "description": "Durable gloves for taekwondo training and competition",
            "image": "https://www.2tuf2tap.com/cdn/shop/files/85_8ab7442a-6a16-4bd4-a18a-adfe45f684c2_1160x_crop_center.jpg?v=1704831687",
            "category": "Protective Gear"
          },
          {
            "id": 6,
            "name": "'Fighter' Taekwondo Dobok Uniform - White/Black",
            "price": 45.00,
            "description": "High-quality dobok uniform for taekwondo practitioners",
            "image": "https://www.2tuf2tap.com/cdn/shop/products/15X2OWELQ8TyGOqgE7Gld9pJxa7sQ9n8H_1160x_crop_center.jpg?v=1666996179",
            "category": "Uniforms"
          },
          {
            "id": 7,
            "name": "'Velocity' Taekwondo Training Shoes - White/Black",
            "price": 35.00,
            "description": "High-performance training shoes for taekwondo practitioners",
            "image": "https://www.2tuf2tap.com/cdn/shop/products/26_1160x_crop_center.jpg?v=1671120717",
            "category": "Shoes"
          },
          {
            "id": 8,
            "name": "'Vintage' Taekwondo Dobok Uniform - White/Black",
            "price": 30.00,
            "description": "Classic dobok uniform for taekwondo enthusiasts",
            "image": "https://www.2tuf2tap.com/cdn/shop/products/15aXmvLXw-xtAll1ppE2JIexeuAjGgATU_1160x_crop_center.jpg?v=1666996284",
            "category": "Uniforms"
          },
          {
            "id": 9,
            "name": "'Champion' Taekwondo Dobok Uniform - White/Black",
            "price": 20.00,
            "description": "High-quality dobok uniform for taekwondo practitioners",
            "image": "https://www.2tuf2tap.com/cdn/shop/products/15HSrwo6BRWHVtv3RSXeXWDT2kBrt9auz_1160x_crop_center.jpg?v=1666996155",
            "category": "Uniforms"
          },
          {
            "id": 10,
            "name": "'Start' Taekwondo Dobok Uniform - White/Black",
            "price": 15.00,
            "description": "Entry-level dobok uniform for taekwondo beginners",
            "image": "https://www.2tuf2tap.com/cdn/shop/files/88_1160x_crop_center.jpg?v=1715764986",
            "category": "Uniforms"
          },
          {
            "id": 11,
            "name": "'Jikida' Taekwondo Headguard - Red/White",
            "price": 25.00,
            "description": "High-quality headguard for taekwondo training and competition",
            "image": "https://www.2tuf2tap.com/cdn/shop/products/14mginuRJnHBricBfMesYPMy-lGkh0rG3_1160x_crop_center.jpg?v=1666998184",
            "category": "Protective Gear"
          },
          {
            "id": 12,
            "name": "'Flash' Taekwondo Training Shoes - White/Silver",
            "price": 15.00,
            "description": "High-performance training shoes for taekwondo practitioners",
            "image": "https://www.2tuf2tap.com/cdn/shop/products/Flash--Taekwondo-Training-Shoes---White-Silver-2TUF2TAP-1669037489_1160x_crop_center.jpg?v=1669037490",
            "category": "Shoes"
          },
          {
            "id": 13,
            "name": "'Poomsae Pro' Taekwondo Dobok Uniform - Male - White/Navy",
            "price": 30.00,
            "description": "High-quality dobok uniform for taekwondo practitioners",
            "image": "https://www.2tuf2tap.com/cdn/shop/products/15Yfeo1ct5dPklWU45mjeopvDOszBenrM_1160x_crop_center.jpg?v=1666996257",
            "category": "Uniforms"
          },
          {
            "id": 14,
            "name": "'Jikida' Taekwondo Headguard - White/Black",
            "price": 25.00,
            "description": "High-quality headguard for taekwondo training and competition",
            "image": "https://www.2tuf2tap.com/cdn/shop/products/14P4JudpiukdHU1WD0s7tIZATdvNEgB2z_1160x_crop_center.jpg?v=1666998208",
            "category": "Protective Gear"
          }
        ];
     

// إدخال المنتجات إلى قاعدة البيانات
Product.insertMany(products)
  .then(() => {
    console.log('Products inserted successfully!');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error inserting products:', error);
    mongoose.connection.close();
  });
