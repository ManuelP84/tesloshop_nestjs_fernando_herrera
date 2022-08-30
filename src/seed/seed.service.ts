import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}

  async executeSeed() {
    this.insertNewProducts();
    return 'SEED EXECUTED!';
  }

  private async insertNewProducts() {
    this.productsService.deleteAllProducts();

    const seedProducts = initialData.products;

    const insertedPromises = [];

    seedProducts.forEach((product) => {
      insertedPromises.push(this.productsService.create(product));
    });

    await Promise.all(insertedPromises);

    return true;
  }
}
