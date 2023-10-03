import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  Query,
} from '@nestjs/common';

import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly MoviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.MoviesService.getAll();
  }

  @Get('search')
  search(@Query('title') searchingTitle: string) {
    return `We are searching for a movie with a title: ${searchingTitle}`;
  }

  @Get(':id')
  getById(@Param('id') id: number): Movie {
    return this.MoviesService.getById(id);
  }

  @Post()
  create(@Body() newData: CreateMovieDto) {
    return this.MoviesService.create(newData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.MoviesService.remove(id);
  }

  @Patch(':id')
  patch(@Param('id') id: number, @Body() updateData: UpdateMovieDto) {
    return this.MoviesService.update(id, updateData);
  }
}
