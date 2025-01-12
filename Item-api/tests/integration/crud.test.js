const chai = require('chai');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const app = require('../../app'); 
const Item = require('../../schemas/item');
const request = require('supertest')

const { expect } = chai;

describe('CRUD Operations', () => {
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await Item.deleteMany({});
  });

  it('should create a new item', async () => {
    const res = await request(app).post('/api/item').send({
      name: 'Item 1',
      discription: 'Item 1 discription',
      phone_number : '+96176115030'
    });

    expect(res.status).to.be.equal(200)
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('name', 'Item 1');
    expect(res.body).to.have.property('discription', 'Item 1 discription');
    expect(res.body).to.have.property('phone_number', '+96176115030');

    const item = await Item.findOne({ name: 'Item 1' });
    expect(item).to.exist;
    expect(item.name).to.equal('Item 1');
  });

  it('should fetch all items', async () => {
    await Item.create({ name: 'Item 1',discription: 'Item 1 discription', phone_number : '+96176115030'});
    const res = await request(app).get('/api/items');
    expect(res.status).to.be.equal(200)
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.equal(1);
    expect(res.body[0]).to.have.property('name', 'Item 1');

  });

  it('should fetch certain item', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const createRespone = await request(app).post('/api/item').send({
      name: 'Item 1',
      discription: 'Item 1 discription',
      phone_number : '+96176115030'
    });
    expect(createRespone.status).to.be.equal(200)
    expect(createRespone.body).to.haveOwnProperty('_id')
    const getResponse = await request(app).get(`/api/item/${createRespone.body._id}`);
    expect(getResponse.status).to.be.equal(200)
    expect(getResponse.body).to.be.an('object');
    expect(getResponse.body).to.have.property('name', 'Item 1');
    expect(getResponse.body).to.haveOwnProperty('phone_info')
    expect(getResponse.body.phone_info).to.be.an('object');
    expect(getResponse.body.phone_info).to.haveOwnProperty('country_code')
    expect(getResponse.body.phone_info).to.haveOwnProperty('country_name')
    expect(getResponse.body.phone_info).to.haveOwnProperty('operator_name')
  });

  it('should update item', async () => {
    const item = await Item.create({ name: 'Item 1',discription: 'Item 1 discription', phone_number : '+96176115030'})
    const res = await request(app).post(`/api/item/${item._id}`).send({
        name : 'Item 2'
    });
    expect(res.status).to.be.equal(200)
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('name', 'Item 2');
  });

  it('should delete item', async () => {
    const item = await Item.create({ name: 'Item 1',discription: 'Item 1 discription', phone_number : '+96176115030'})
    const res = await request(app).delete(`/api/item/${item._id}`)
    expect(res.status).to.be.equal(200)
    const deleteItem = await Item.findById(item._id);
    expect(deleteItem).to.be.null;
  });

});