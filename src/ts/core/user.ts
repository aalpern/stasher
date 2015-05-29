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
    if (data) {
      this.id = data.id
      this.name = data.name
      this.emailAddress = data.emailAddress
      this.displayName = data.displayName
      this.active = data.active
      this.slug = data.slug
      this.type = data.type
      this.directoryName = data.directoryName
      this.mutableDetails = data.mutableDetails
      this.mutableGroups = data.mutableGroups
      this.lastAuthenticationTimestamp = data.lastAuthenticationTimestamp
    }
  }
}
