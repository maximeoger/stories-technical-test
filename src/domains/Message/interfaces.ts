import { User } from 'domains/User/interfaces'

export interface Message {
  type: string
  text: string
  user: User
}