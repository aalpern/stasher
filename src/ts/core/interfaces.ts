
/* -----------------------------------------------------------------------------
   Miscellaneous types
   ----------------------------------------------------------------------------- */

export interface Link {
  href: string
  name?: string
}

export type LinkList = Link[]

export interface LinkDictionary {
  [index: string] : LinkList
}

export interface Relation {
  url: string
  rel: string
}

/* -----------------------------------------------------------------------------
   Base Types
   ----------------------------------------------------------------------------- */

export interface Entity {
  link: Relation
  links: LinkDictionary
}

/* -----------------------------------------------------------------------------
   Admin Types
   ----------------------------------------------------------------------------- */

export interface User extends Entity {
  id: number
  name: string
  emailAddress: string
  displayName: string
  active: boolean
  slug: string
  type: string
  directoryName?: string
  mutableDetails?: boolean
  mutableGroups?: boolean
  lastAuthenticationTimestamp?: number
}

export interface Group {
  name: string
  deletable?: boolean
}

/* -----------------------------------------------------------------------------
   Projects & Repositories
   ----------------------------------------------------------------------------- */

export interface Project extends Entity {
  id: number
  key: string
  name: string
  description: string
  public: boolean
  type: string
}

export interface Repository extends Entity {
  id: number
  slug: string
  name: string
  scmId: string
  state: string
  statusMessage: string
  forkable: boolean
  project: Project
  public: boolean
  cloneUrl: string
}

export interface Fork extends Repository {
  origin: Repository
}

export interface Branch {
  id: string
  displayId: string
  latestChangeset: string
  isDefault: boolean
}

export interface Commit {
  id: string
  displayId: string
  author?: User
  authorTimestamp?: number
  message?: string
  parents?: Commit[]
}

export interface Path {
  components: string[]
  parent: string
  name: string
  extension: string
  toString: string
}

export interface Change extends Entity {
  contentId: string
  fromContentId?: string
  path: Path
  executable: boolean
  percentUnchanged: number
  type: string
  nodeType: string
  srcPath?: Path
  srcExecutable?: boolean
}

export interface PullRequestParticipant {
  user: User
  role: string
  approved: boolean
}

export interface PullRequestAttributes {
  resolvedTaskCount: string[]
  openTaskCount: string[]
  commentCount: string[]
}

export interface BranchReference {
  id: string
  displayId: string
  latestChangeSet: string
  repository: Repository
}

export interface PullRequest extends Entity {
  id: number
  version: number
  title: string
  descripion: string
  state: string
  open: boolean
  closed: boolean
  createdDate: number
  updatedDate: number
  fromRef: BranchReference
  toRef: BranchReference
  locked: boolean
  author: PullRequestParticipant
  reviewers: PullRequestParticipant[]
  participants: PullRequestParticipant[]
}

export interface PullRequestActivity {
  id: number
  createdDate: number
  user: User
  action: string
  changeset?: Commit
  // comment?
  // commentAction?
  // fromHash?
  // previousFromHash?
  // toHash?
  // previousToHash?
  // added?
  // removed?
}
