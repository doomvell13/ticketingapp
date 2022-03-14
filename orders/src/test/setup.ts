import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signin: () => string[];
}

jest.mock('../nats-wrapper.ts');

let mongo: any;

beforeAll(async () => {
  jest.clearAllMocks();
  process.env.JWT_KEY = 'asdf';
  mongo = await MongoMemoryServer.create();
  const mongoURI = await mongo.getUri();
  await mongoose.connect(mongoURI);
});
beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});
afterAll(async () => {
  await mongo.stop();
});

global.signin = () => {
  //Build a JWT payload {id, email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // Create a JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //Build Session Object { jwt: MY_JWT }
  const session = { jwt: token };

  //Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  //Take Json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  //return cookie with encoded data
  return [`session=${base64}`];
};
