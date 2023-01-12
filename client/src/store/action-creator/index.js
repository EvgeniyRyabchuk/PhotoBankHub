import * as UserActionCreators from './user'
import * as GeneralActionCreators from './general'
import * as CardActionCreators from './card'


export default {
    ...UserActionCreators,
    ...GeneralActionCreators,
    ...CardActionCreators
}

