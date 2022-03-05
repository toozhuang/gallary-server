import { INfometa } from '../../app/dto/movie.interface';
import { IMovieDB } from './json-db';

export interface IExistDB {
  (name: string, version: number): Promise<boolean> | any;
}

export interface ICreateDB {
  (name: string, version: number): void;
}

export interface IOpenDB {
  (name: string, version: number): Promise<IMovieDB>;
}

export interface ISaveDB {
  (jsonDbObj: any): void;
}

export interface IInsertDB {
  (jsonDbObj: any, movieItem: INfometa): void;
}

export interface IFindItemDB {
  (jsonDbObj: any, itemId: string): number;
}
