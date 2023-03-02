export type CreateTask = {
  name: string
  done: boolean
  createdAt: number
  updatedAt: number
}

export type ActuallyTask = {
  uuid: string
  name: string
  done: boolean
  createdAt: number
  updatedAt: number
}

export type UserData = {
  username: string
  password: string
}
