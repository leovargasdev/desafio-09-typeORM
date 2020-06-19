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

    const productsExist = await this.productsRepository.findAllById(products);
    if (!productsExist.length)
      throw new AppError('Some any list product not exist');

    // const productsAA = productsExist.map(product => {
    //   const id = Number(product.id);
    //   if (product.quantity < products[id].quantity)
    //     throw new AppError('Product exed limit');

    //   return { ...products[id]., price: product.price };
    // });

    const order = await this.ordersRepository.create({
      customer: customerExist,
      products: productsExist,
    });

    return order;
  }
}

export default CreateOrderService;
