import axios from 'axios';
import { getToken } from './AuthService';

const BASE_URL = "http://localhost:8080/api/todos/v1";

axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = getToken();
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  

export const getTodoslist = () => axios.get(BASE_URL);
export const addTodo = (todo) => axios.post(BASE_URL,todo);
export const getTodo = (id) => axios.get(BASE_URL+"/"+id);
export const updateTodo =(todo) => axios.put(BASE_URL,todo);
export const deleteTodo = (id) => axios.delete(BASE_URL+"/"+id);
export const completed = (id) => axios.patch(BASE_URL+'/'+id+'/complete');
export const inCompleteTodo = (id) => axios.patch(BASE_URL+'/'+id+'/inComplete');