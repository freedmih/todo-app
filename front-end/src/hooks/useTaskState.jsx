import { useState } from 'react';
import { Constants } from '../constants';

export default initialValue => {
    const [todos, setTodos] = useState(initialValue);

    return {
        todos,
        loadTodos: todos => {
            setTodos(todos);
        },
        addTodo: todoObject => {
            setTodos([...todos, todoObject]);
        },
        deleteTodo: todoIndex => {
            const newTodos = todos.filter((todo) => todo.uuid !== todoIndex);
            setTodos(newTodos);
        },
        updateTodo: (todoIndex, todo = {}) => {
            const newTodos = [...todos];
            const idx = todos.findIndex(task => task.uuid === todoIndex);
            newTodos[idx] = { ...todos[idx], ...todo };
            setTodos(newTodos);
        },
        isValidTitle: title => {
            if (title.trim().length === 0) {
                return {
                    result: false,
                    message: Constants.ERROR_EMPTY_TASK
                }
            }
            
            if (todos.findIndex(task => task.name === title) > -1) {
                return {
                    result: false,
                    message: Constants.ERROR_DUPLICATE_TASK
                }
            }

            return {
                result: true
            };
        }
    };
};