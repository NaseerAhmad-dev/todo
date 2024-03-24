module.exports = class Todo {

  static addTodo(fs, todoData, status) {
    return new Promise((resolve, reject) => {
      fs.readFile('todos.json', 'utf8', (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          reject(err);
          return;
        }

        let todos = [];
        if (data) {
          todos = JSON.parse(data);
        }

        // Generate unique ID for new todo item
        const newTodoId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

        // Create new todo object
        const newTodo = { id: newTodoId, ...todoData , status};

        // Add new todo to todos array
        todos.push(newTodo);

        // Write updated todos data back to file
        fs.writeFile('todos.json', JSON.stringify(todos), 'utf8', (err) => {
          if (err) {
            console.error("Error writing file:", err);
            reject(err);
            return;
          }
          console.log('Todo item added successfully');
          resolve(newTodoId); // Resolve with the ID of the added todo
        });
      });
    });
  }

  static getTodos(fs) {
    return new Promise((resolve, reject) => {
      fs.readFile('todos.json', 'utf8', (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          reject(err);
          return;
        }

        let todos = [];
        if (data) {
          todos = JSON.parse(data);
        }

        resolve(todos); // Resolve with the todos array
      });
    });
  }

  static updateTodo(fs, id, updatedTodoData) {
    console.log("Hello Welcome" + JSON.stringify(updatedTodoData));
    return new Promise((resolve, reject) => {
      fs.readFile('todos.json', 'utf8', (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          reject(err);
          return;
        }
  
        let todos = [];
        if (data) {
          todos = JSON.parse(data);
        }
  
        // Find the todo item with the given ID
        const todoToUpdate = todos.find(todo => todo.id === id);
        if (!todoToUpdate) {
          reject(new Error("Todo item not found"));
          return;
        }
  
        // Update the todo item
        console.log("Before update:", todoToUpdate , todoToUpdate);
        Object.assign(todoToUpdate, updatedTodoData);
        console.log("After update:", todoToUpdate);
        // Write updated todos data back to file
        fs.writeFile('todos.json', JSON.stringify(todos), 'utf8', (err) => {
          if (err) {
            console.error("Error writing file:", err);
            reject(err);
            return;
          }
          console.log('Todo item updated successfully');
          resolve(); // Resolve without returning any value 
        });
      });
    });
  }
  

  static deleteTodo(fs, id) {
    return new Promise((resolve, reject) => {
      fs.readFile('todos.json', 'utf8', (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          reject(err);
          return;
        }

        let todos = [];
        if (data) {
          todos = JSON.parse(data);
        }

        // Filter out the todo item with the given ID
        const filteredTodos = todos.filter(todo => todo.id !== id);

        // Check if any todo item was deleted
        if (filteredTodos.length === todos.length) {
          reject(new Error("Todo item not found"));
          return;
        }

        // Write updated todos data back to file
        fs.writeFile('todos.json', JSON.stringify(filteredTodos), 'utf8', (err) => {
          if (err) {
            console.error("Error writing file:", err);
            reject(err);
            return;
          }
          console.log('Todo item deleted successfully');
          resolve(); // Resolve without returning any value
        });
      });
    });
  }

}