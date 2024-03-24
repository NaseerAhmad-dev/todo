export class todoModel {
    todo!:string 
    id!:number
    status!:string 
}

export interface TodosResponse {
    status: string;
    message: string;
    data: todoModel[];
  }
