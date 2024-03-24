import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';
import { todoModel } from 'src/app/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface TodoItem {
  todoTitle: string;
}
@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.scss']
})

export class DashboardComponentComponent implements OnInit  {
  todoArray: TodoItem[] = [];
  todoTitle: string = '';
  dataModel: todoModel = new todoModel;
  allTodos:any = {};
  currentTodos: any; 
  currentPage: number = 1;
  pageSize: number = 4;    // Todos to display based on navigation
  selectedButton: string = 'All';
  myForm!: FormGroup; 
  isUpdate:boolean = false;
  id!:number;

  constructor(private _dataService: DataServiceService, private fb:FormBuilder)  {
    this.getTodos();
   }

   ngOnInit(): void {
    this.myForm = this.fb.group({
      todoInput: ['', Validators.required] // Define input field with Validators.required to make it required
    });
   }
  showAll() {
    this.selectedButton = 'All';
    this.currentTodos = this.allTodos;
  }

  showCompleted() {
    this.selectedButton = 'Completed';
    this.currentTodos = this.allTodos.filter((todo: todoModel) => todo.status === 'completed'); // Filter completed todos
  }

  showPending(){
    this.selectedButton = 'Pending';
    this.currentTodos = this.allTodos.filter((todo: todoModel) => todo.status === 'pending'); // Filter completed todos
  }
  showdeleted(){
    this.selectedButton = 'Deleted';
    this.currentTodos = this.allTodos.filter((todo: todoModel) => todo.status === 'deleted');
  }
  
  
  todoInput() {
    return this.myForm.get('todoInput');
  }
  
  // Pagination methods
  totalPages(): number {
    // Ensure currentTodos is defined and has a length
    if (!this.currentTodos || this.currentTodos.length === 0 || this.pageSize === 0) {
        return 0; // Return 0 pages if no todos or pageSize is 0
    }
    return Math.ceil(this.currentTodos.length / this.pageSize);
}

nextPage() {
    if (this.currentPage < this.totalPages()) {
        this.currentPage++;
    }
}

prevPage() {
    if (this.currentPage > 1) {
        this.currentPage--;
    }
}

getPageTodos(): any[] {
    // Ensure currentTodos is defined
    if (!this.currentTodos) {
        return [];
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    // Ensure startIndex is within bounds
    if (startIndex < 0 || startIndex >= this.currentTodos.length) {
        return [];
    }
    // Return page todos
    return this.currentTodos.slice(startIndex, startIndex + this.pageSize);
}


  getTodos() {
    this.selectedButton = 'All'
    this._dataService.getData().subscribe((res) => {
      if (res) {
          this.allTodos = res;
          this.allTodos = this.allTodos.data;
          this.currentTodos = this.allTodos;
      }
    });
  }
  editTodo(todo:todoModel){
    this.myForm.get('todoInput')?.setValue(todo.todo);
    this.isUpdate = true;
    this.id = todo.id;
  }
  
  onKey(e: any) {
    this.todoTitle = e.target.value;
  }
  addToList() {
    this.dataModel.todo = this.todoInput()?.value;
    this.dataModel.status = "pending"
    if(this.isUpdate) {
      this.dataModel.id = this.id;
    } else {
      this.isUpdate = false;
    }
    this._dataService.todoRequest(this.dataModel, this.isUpdate).subscribe(res => {
      if (res) {
        this.getTodos();
        this.myForm.get('todoInput')?.setValue('');
        this.isUpdate = false;
      }
    });
  }
  

  markCompleted(todo:any){
    todo.status = 'Incompleted';
    this._dataService.updateTodo(this.dataModel).subscribe(res => {
      if(res)
         this.getTodos();
    })
  }
}
