const expect = require('chai').assert;

const db = require('../server/db');
before(() => db.sync({ force: true }));
afterEach(() => db.sync({ force:true }));




let hi = 'hello'
describe('It', () => {
  it('works', () => {
    expect.equal(hi, 'hello');
  });
})
