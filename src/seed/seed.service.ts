import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { User } from '../auth/entities';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async executeSeed() {
    await this.deleteTables();
    const firstUser = await this.insertUsers();
    await this.insertNewProducts(firstUser);
    return 'SEED EXECUTED!';
  }

  private async deleteTables() {
    await this.productsService.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create({
        ...user,
        password: bcrypt.hashSync(user.password, 10),
      })); // At this time the entity has not the id
    });
    console.log(users[0]);
    
    const dbUsers = await this.userRepository.save(users); // Here the entity is saved into the databas and now it has an id

    return dbUsers[0];
  }

  private async insertNewProducts(firstUser: User) {
    this.productsService.deleteAllProducts();

    const seedProducts = initialData.products;

    const insertedPromises = [];

    seedProducts.forEach((product) => {
      insertedPromises.push(this.productsService.create(product, firstUser));
    });

    await Promise.all(insertedPromises);

    return true;
  }
}
