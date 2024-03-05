import { IChatData } from './IChatData'
import { IUserDetails } from './IUserDetails'

export interface IChatDataWithUserDetails extends IChatData {
  other_user_details: IUserDetails
}
