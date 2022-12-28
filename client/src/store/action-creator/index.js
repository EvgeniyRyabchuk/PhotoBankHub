import * as UserActionCreators from './user'
import * as GeneralActionCreators from './general'


export default {
    ...UserActionCreators,
    ...GeneralActionCreators
}

