import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateListOrdersProductsToOrdersAndToProducts1592576848648
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'order_products',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'ListOrderProducts',
        columnNames: ['order_products'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders_products',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'order_products',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        name: 'ListOrderProducts',
        columnNames: ['order_products'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders_products',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'ListOrderProducts');
    await queryRunner.dropColumn('orders', 'orders_products');

    await queryRunner.dropForeignKey('products', 'ListOrderProducts');
    await queryRunner.dropColumn('products', 'orders_products');
  }
}
