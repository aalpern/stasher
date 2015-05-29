import {
  User
} from './interfaces'
import EntityModel from './entity'

export default class UserModel extends EntityModel implements User {
  id: number
  name: string
  emailAddress: string
  displayName: string
  active: boolean
  slug: string
  type: string
  directoryName: string
  mutableDetails: boolean
  mutableGroups: boolean
  lastAuthenticationTimestamp: number

  constructor(data?: any) {
    super(data)
  }
}
