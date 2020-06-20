import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';
import AppError from '@shared/errors/AppError';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const findOrder = container.resolve(FindOrderService);

    const { id } = request.params;

    const order = await findOrder.execute({ id });
    if (!order) {
      throw new AppError('Order not found');
    }
    return response.status(200).json({
      ...order,
      order_products: order.order_products.map(p => ({
        ...p,
        quantity: Number(p.quantity),
        price: Number(p.price).toFixed(2),
      })),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createOrder = container.resolve(CreateOrderService);

    const { customer_id, products } = request.body;

    const order = await createOrder.execute({ customer_id, products });

    return response.json(order);
  }
}
