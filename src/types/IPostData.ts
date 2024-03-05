export interface IPostData {
  photo_url: string
  description: string
  uid: string
}

export interface IReturnedPostData extends IPostData {
  post_id: string
  created_at: Date
  username: string
  photoURL: string
}
