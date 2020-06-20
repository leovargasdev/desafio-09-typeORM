import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerExist = await this.customersRepository.findById(customer_id);
    if (!customerExist) throw new AppError('Customer not exist');
    // Lembrar de colocar isso dentro do map
    const productsExist = await this.productsRepository.findAllById(products);
    if (!productsExist.length)
      throw new AppError('Some any list product not exist');

    const productsOrder: any = [];

    const productsUpdate = productsExist.map(product => {
      const { id, price, quantity } = product;

      const pRequest = products.filter(p => p.id === id)[0];
      if (pRequest.quantity > quantity)
        throw new AppError('This quantity exceeded the amount of product');

      productsOrder.push({
        product_id: id,
        price,
        quantity: pRequest.quantity,
      });

      return {
        id,
        quantity: quantity - pRequest.quantity,
      };
    });

    await this.productsRepository.updateQuantity(productsUpdate);

    const order = await this.ordersRepository.create({
      customer: customerExist,
      products: productsOrder,
    });

    return order;
  }
}

export default CreateOrderService;
