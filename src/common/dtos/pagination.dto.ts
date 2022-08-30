import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number) // The same as: enableImplicitConvertions: true
    limit?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number) // The same as: enableImplicitConvertions: true
    offset?: number;
}