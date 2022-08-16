const baseUrl = 'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production';

export const createTodoRequest = async (token, data) => {
  try {
    const response = await fetch(`${baseUrl}/todos`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: data }),
    });
    const newTodo = await response.json();

    return newTodo;
  } catch (err) {
    console.log(err.response);
  }
};

export const getTodoRequest = async (token) => {
  try {
    const response = await fetch(`${baseUrl}/todos`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const todoList = await response.json();

    return { status: response.status, todoList };    
  } catch (err) {
    console.log(err.response);
  }
};

export const updateTodoRequest = async (token, id, data, isCompleted) => {
  try {
    const response = await fetch(`${baseUrl}/todos/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: data, isCompleted: isCompleted }),
    });

    return { status: response.status };
  } catch (err) {
    console.log(err.response);
  }
};

export const deleteTodoRequest = async (token, id) => {
  try {
    const response = await fetch(`${baseUrl}/todos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    return { status: response.status };
  } catch (err) {
    console.log(err.response);
  }
};
