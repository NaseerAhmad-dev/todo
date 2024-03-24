import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';
import { todoModel } from 'src/app/model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  constructor(private _dataService: DataServiceService) { }
  @Input() SingleTodo!: todoModel

  @Output() editedTodo: EventEmitter<any> = new EventEmitter();
  updateTodo(todo: todoModel) {
    this.editedTodo.emit(todo)
  }

  deleteTodo(todo: todoModel) {
    todo.status = 'deleted'
    this._dataService.updateTodo(todo).subscribe(resp => {
      console.log(resp);
    })
  }
  todoCompleted(todo: todoModel) {
    todo.status = (todo.status === 'completed') ? 'pending' : 'completed';
    this._dataService.updateTodo(todo).subscribe(resp => {
      console.log(resp);
    })
  }
}
