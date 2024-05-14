import axios from 'axios'

const URL='http://localhost:3000'

//POST login by address http://localhost:3000/api/user/login
export const login=(user,password) =>{
return axios.post(`${URL}/api/user/login`,{user:user,password:password})
}

//POST register by address http://localhost:3000/api/user/register
export const register=(user,password) =>{
return axios.post(`${URL}/api/user/register`,{user:user,password:password})
}

//GET all todos by address http://localhost:3000/api/list/getList
export const getTodos=()=>{
return axios.get(`${URL}/api/list/getList`)}

//POST one todo by address http://localhost:3000/api/list/addTodo
export const addTodo=(data)=>{
return axios.post(`${URL}/api/list/addTodo`,data)}

//GET check or unCheck a todo by address http://localhost:3000/api/list/editTodo/:id
export const editTodo=(id)=>{
return axios.get(`${URL}/api/list/editTodo/${id}`,)}

//DELETE one todo by address http://localhost:3000/api/list/deleteTodo/:id
export const deleteTodo=(id)=>{
return axios.delete(`${URL}/api/list/deleteTodo/${id}`)}