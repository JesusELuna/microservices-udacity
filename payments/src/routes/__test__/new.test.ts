import request from 'supertest';
import { app } from '../../app';
import mongoose, { mongo } from 'mongoose';
import { Order } from '../../models/order';
import { OrderStatus } from '@ovtickets/common';
import { stripe } from '../../stripe';
import { Payment } from '../../models/payment';

jest.mock('../../stripe');


it('returns a 404 when purchasing an order that does not exist', async () => {
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: 'asdada',
      orderId: mongoose.Types.ObjectId().toHexString()
    })
    .expect(404)
})

it('returns a 401 when purchasing an order that does not belong the the user', async () => {
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: 'asdada',
      orderId: order.id
    })
    .expect(401)

})

it('returns a 400 when purchasing a cancelled order', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: id,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(id))
    .send({
      token: 'asdada',
      orderId: order.id
    })
    .expect(400)
})

it('returns a 201 with valid inputs', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: id,
    version: 0,
    price: 20,
    status: OrderStatus.Created
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(id))
    .send({
      token: 'tok_visa',
      orderId: order.id
    }).expect(201)

  const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
  expect(chargeOptions.source).toEqual('tok_visa');
  expect(chargeOptions.amount).toEqual(20 * 100);
  expect(chargeOptions.currency).toEqual('usd');
})