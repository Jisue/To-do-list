import express, {Request, Response, Router} from 'express';
import {DB} from '../src/config/db';
import dotenv from 'dotenv';

//.env 환경변수 로드
dotenv.config();
const connection = new DB().connection;

export class Api {

    public api : express.Application;
  
    constructor(){
      this.api = express();
    }
  }

const api = new Api().api;