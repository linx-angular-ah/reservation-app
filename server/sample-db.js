const Product = require('./model/product');

class SampleDb {
  constructor() {
    this.products = [
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone XL',
        price: 799,
        description: 'A large phone with one of the best screens',
        heading1: 'サンプルテキスト１ー１',
        heading2: 'サンプルテキスト１ー２',
        heading3: 'サンプルテキスト１ー３',
        headingtext1: 'サンプル１−１',
        headingtext2: 'サンプル１−２',
        headingtext3: 'サンプル１−３',
      },
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone Mini',
        price: 699,
        description: 'A great phone with one of the best cameras',
        heading1: 'サンプルテキスト２ー１',
        heading2: 'サンプルテキスト２ー２',
        heading3: 'サンプルテキスト２ー３',
        headingtext1: 'サンプル２−１',
        headingtext2: 'サンプル２−２',
        headingtext3: 'サンプル２−３',
      },
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone Standard',
        price: 299,
        description: '',
        heading1: 'サンプルテキスト３ー１',
        heading2: 'サンプルテキスト３ー２',
        heading3: 'サンプルテキスト３ー３',
        headingtext1: 'サンプル３−１',
        headingtext2: 'サンプル３−２',
        headingtext3: 'サンプル３−３',
    },
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone Special',
        price: 999,
        description: '',
        heading1: 'サンプルテキスト４ー１',
        heading2: 'サンプルテキスト４ー２',
        heading3: 'サンプルテキスト４ー３',
        headingtext1: 'サンプル４−１',
        headingtext2: 'サンプル４−２',
        headingtext3: 'サンプル４−３',
      }
    ]
  };

  async initDb() {
    await this.cleanDb();
    this.pushProtuctsToDB();
  };

  async cleanDb() {
    await Product.deleteMany({});
  };
  
  pushProtuctsToDB() {
    this.products.forEach(
      (product) => {
        const newProduct = new Product(product);
        newProduct.save();
      }
    )
  };

  seeDb() {
    this.pushProtuctsToDB();
  }
};

module.exports = SampleDb;
