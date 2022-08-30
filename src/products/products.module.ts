// Nest
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// App
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
