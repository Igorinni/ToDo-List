export type TaskObj = {
  uuid: string
  name: string
  done: boolean
  createdAt: Date | string
  updatedAt?: Date | string
}

export type newTask = {
  name: string
  done: boolean
  createdAt?: number
  updatedAt?: number
}

export type User = {
  username: string
  password: string
}
