import {
  Participant
} from './interfaces'

import UserModel from './user'

export default class ParticipantModel implements Participant {
  user: UserModel
  role: string
  approved: boolean

  constructor(data?: any) {
    if (data) {
      this.user = new UserModel(data.user)
      this.role = data.role
      this.approved = data.approved
    }
  }
}
