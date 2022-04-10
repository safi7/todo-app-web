import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import _ from 'lodash'

@Injectable({ providedIn: 'root' })
export default class TodoListService {
  constructor(private httpS: HttpService) { }

  getList() {
    return this.httpS.get(`/to-do-list`);
  }

  get(payload) {
    return this.httpS.get(`/to-do-list/${payload.id}`);
  }

  update(payload) {
    return this.httpS.post(`/to-do-list?id=${payload.id}`, _.omit(payload,'id'));
  }

  delete(payload) {
    return this.httpS.delete(`/to-do-list/${payload.id}`);
  }

}

export { TodoListService };
