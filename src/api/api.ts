import request from 'request';

export class Api {
  public api(path:string):string{

    let url = "http://localhost:3001"+path;

    return url;

  }
}