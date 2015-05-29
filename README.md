A JavaScript client for Atlassian Stash's REST API, utilizing
Promises.

### Status

* [ ] [Core API](https://developer.atlassian.com/static/rest/stash/3.9.2/stash-rest.html)
  * [ ] Projects
    * [x] `GET /rest/api/1.0/projects`
    * [x] `GET /rest/api/1.0/projects/{key}`
    * [x] `GET /rest/api/1.0/projects/{key}/repos`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/forks`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/related`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/branches`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/branches/default`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/browse`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/changes`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/commits`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/commits/{id}`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/commits/{id}/changes`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/commits/{id}/comments`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/files`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/pull-requests`
    * [x] `GET /rest/api/1.0/projects/{key}/repos/{repo}/pull-requests/{id}`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/pull-requests/{id}/activities`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/pull-requests/{id}/changes`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/pull-requests/{id}/comments`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/pull-requests/{id}/commits`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/pull-requests/{id}/diff`
    * [ ] `GET /rest/api/1.0/projects/{key}/repos/{repo}/pull-requests/{id}/participants`
  * [x] Profile
    * [x] `GET /rest/api/1.0/profile/recent/repos`
  * [ ] Users
    * [ ] `GET /rest/api/1.0/users`
    * [ ] `GET /rest/api/1.0/users/{slug}`
* [ ] [Build Integration API](https://developer.atlassian.com/static/rest/stash/3.9.2/stash-build-integration-rest.html)
