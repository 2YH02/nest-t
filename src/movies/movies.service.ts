import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getById(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) throw new NotFoundException(`${id} is mot found`);
    return movie;
  }

  remove(id: number) {
    this.getById(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  create(newData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...newData,
    });
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getById(id);
    this.remove(id);
    this.movies.push({
      ...movie,
      ...updateData,
    });
  }
}
