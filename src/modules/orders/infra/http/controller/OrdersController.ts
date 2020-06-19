import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
// import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  // eslint-disable-next-line
  public async show(request: Request, response: Response): Promise<void> {
    // TODO
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createOrder = container.resolve(CreateOrderService);

    const { customer_id, products } = request.body;

    const order = await createOrder.execute({ customer_id, products });

    return response.json(order);
  }
}
