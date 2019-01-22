import axios, { AxiosPromise } from 'axios'
export enum EOrder {
  Desc = 'desc',
  Asc = 'asc',
}
export interface ISearchParam {
  q: string
  page: number
  per_page: number
  sort: string
  order: EOrder
}

// export function fetchReposts(params: ISearchParam) {
//   return axios.get('https://api.github.com/search/repositories', { params })
// }
export interface IUserProps {
  sort: 'starts' | 'forks' | 'best-match'
  order: 'desc' | 'asc'
  page?: number
}

export function fetchUsers(params: IUserProps) {
  return axios.get('https://api.github.com/search/users', { params })
}

export interface IRepostParams {
  sort: 'starts' | 'forks' | 'best-match'
  order: 'desc' | 'asc'
}

export function fetchRepost(params: IRepostParams): AxiosPromise {
  return axios.get('https://api.github.com/search/repositories?q=topic:ruby+topic:rails', {
    params,
  })
}
