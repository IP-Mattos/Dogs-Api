/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dogs, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  min_height: 1,
  max_height: 4,
  min_weight: 3,
  max_weight: 10,
  temperament: "Active"
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dogs.sync({ force: true })
    .then(() => Dogs.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
    describe('GET /temperament', () => {
      it('should get 200', () =>
        agent.get('/temperament').expect(200)
      );
    });
  });
});
