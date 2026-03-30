import API from './api'

export const getTasks = (status) => 
  API.get('/api/tasks', { params: status ? { status } : {} })

export const getTaskById = (id) => API.get(`/api/tasks/${id}`)
export const createTask = (data) => API.post('/api/tasks', data)
export const updateTask = (id, data) => API.put(`/api/tasks/${id}`, data)
export const deleteTask = (id) => API.delete(`/api/tasks/${id}`)