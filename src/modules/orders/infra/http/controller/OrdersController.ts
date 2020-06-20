import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const findOrder = container.resolve(FindOrderService);

    const { id } = request.params;
    console.log(id);
    const order = await findOrder.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createOrder = container.resolve(CreateOrderService);

    const { customer_id, products } = request.body;

    const order = await createOrder.execute({ customer_id, products });

    return response.json(order);
  }
}
