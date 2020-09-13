const mongoose = require('mongoose');
const faker = require('faker');
const slugify = require('slugify');

const Product = require('../models/productModel');
const User = require('../models/userModel');
const env = require('../config/environment');

(async () => {
  // If on Production, don't seed
  if (env.env !== 'development') return;

  mongoose
    .connect(env.db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch((err) => console.error(err));
  mongoose.connection.on('open', () => console.log('MongoDB running'));
  mongoose.connection.on('error', (err) => console.error(err));

  try {
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('DB purged');
  } catch (err) {
    return console.error(err);
  }

  const fakeProducts = Array(10)
    .fill(null)
    .map((product) => {
      const fakeName = faker.commerce.productName();
      return {
        name: fakeName,
        description: faker.lorem.words(
          faker.random.number({ min: 8, max: 24 })
        ),
        imgURL: `https://robohash.org/${slugify(fakeName, {
          lower: true,
          strict: true,
        })}`,
        price: faker.finance.amount(99.99, 999.99, 2),
      };
    });

  const fakeUser = new User({
    email: 'mustafa@dci.com',
    password: 'notsecretatall00',
    creditCard: '43453467456776578',
  });

  try {
    await Product.create(fakeProducts);
    await User.create(fakeUser);
    console.log('Fake data written');
  } catch (err) {
    console.error(err);
  }

  mongoose.connection.close();
})();
