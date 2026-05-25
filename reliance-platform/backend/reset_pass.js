const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/reliance_db').then(async () => {
  const hash = await bcrypt.hash('123456', 12);
  await mongoose.connection.db.collection('users').updateOne(
    { phone: '9988776655' },
    { $set: { password_hash: hash } }
  );
  console.log('Password reset to 123456');
  process.exit(0);
});
