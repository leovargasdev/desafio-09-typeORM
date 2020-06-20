import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '../entities/Order';
import OrdersProducts from '../entities/OrdersProducts';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  private ormOrdersProductsRepository: Repository<OrdersProducts>;

  constructor() {
    this.ormRepository = getRepository(Order);
    this.ormOrdersProductsRepository = getRepository(OrdersProducts);
  }

  public async create({ customer, products }: ICreateOrderDTO): Promise<Order> {
    const order = await this.ormRepository.save({ customer });

    const orderProducts = products.map(product => ({
      product: { id: product.product_id },
      order: { id: order.id },
      order_id: order.id,
      ...product,
    }));

    const orderProductsSave = await this.ormOrdersProductsRepository.save(
      orderProducts,
    );

    order.order_products = orderProductsSave;

    return this.ormRepository.save(order);
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne(id, {
      relations: ['customer', 'order_products'],
    });
    return order;
  }
}

export default OrdersRepository;
