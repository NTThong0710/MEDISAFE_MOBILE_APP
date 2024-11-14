const mongoose = require('mongoose');
const Symptoms = require('./Symptoms');

mongoose.connect('mongodb://localhost:27017/medisafe')
  .then(() => {
    console.log('MongoDB connected successfully');
    
    const symptoms = [
      {
        name: 'Đau đầu',
        illness: ['Sốt', 'Cảm cúm', 'Stress'],
      },
      // Thêm các điều kiện sức khỏe khác ở đây
    ];

    return Symptoms.insertMany(symptoms);
  })
  .then(() => {
    console.log('Health conditions seeded successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding data:', err);
  });
