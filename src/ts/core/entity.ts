import {
  Relation, LinkDictionary, Entity
} from './interfaces'

export default class EntityModel implements Entity {
  link: Relation
  links: LinkDictionary

  constructor(data?: any) {
    if (data) {
      this.link = data.link
      this.links = data.links
    }
  }
}
