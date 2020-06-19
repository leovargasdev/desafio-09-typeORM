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
      ...product,
      product_id: product.id,
      order_id: order.id,
    }));

    const orderProductsSave = await this.ormOrdersProductsRepository.save(
      orderProducts,
    );

    order.order_products = orderProductsSave;
    await this.ormRepository.save(order);

    return order;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne({ where: { id } });
    return order;
  }
}

export default OrdersRepository;
