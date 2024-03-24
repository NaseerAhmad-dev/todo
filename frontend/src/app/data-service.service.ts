import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { todoModel } from './model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private  baseUrl = 'http://localhost:3000';    //backend URL

  constructor(private http: HttpClient) { }

  todoRequest(data: any, isUpdate: boolean = false) {
    if (isUpdate) {
      return this.updateTodo(data);
    } else {
      return this.postData(data);
    }
  }

  getData() {
    return this.http.get(`${this.baseUrl}/v1/todo`);
  }

  postData(post_data: todoModel) {
    return this.http.post(`${this.baseUrl}/v1/todo/add`, post_data);
  }

  updateTodo(post_data:todoModel){
    return this.http.put(`${this.baseUrl}/v1/todo/${post_data.id}`, post_data);
  }
}
