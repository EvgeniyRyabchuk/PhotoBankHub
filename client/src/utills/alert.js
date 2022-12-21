import {toast} from "react-toastify";


const SimpleAlertMessage =  {
    LOGGED_IN: 'Welcome to admin panel'
}

const PrimarySuccessAlert = {
    FETCH_CUSTOMERS: 'Success fetch customer',

    CREATED_NEWS: 'News successfully created',
    UPDATED_NEWS: 'News successfully updated',
    DELETED_NEWS: 'News successfully deleted',

    CREATED_JOB_APPLICATION: 'Job application successfully created',
    UPDATED_JOB_APPLICATION: 'Job application successfully updated',
    DELETED_JOB_APPLICATION: 'Job application successfully deleted',

    CREATED_VACANCY: 'Vacancy successfully created',
    UPDATED_VACANCY: 'Vacancy successfully updated',
    DELETED_VACANCY: 'Vacancy successfully deleted',

    CREATED_PROJECT: 'Project successfully created',
    UPDATED_PROJECT: 'Project successfully updated',
    DELETED_PROJECT: 'Project successfully deleted',

    ADD_EMPLOYEE_TO_PROJECT: 'Employee added to project successfully',
    REMOVE_EMPLOYEE_FROM_PROJECT: 'Employee was remove from project successfully',

    CREATED_ORDER: 'Order successfully created',
    UPDATED_ORDER: 'Order successfully updated',
    DELETED_ORDER: 'Order successfully deleted',

    CREATED_EMPLOYEE: 'Employee successfully created',
    UPDATED_EMPLOYEE: 'Employee successfully updated',
    DELETED_EMPLOYEE: 'Employee successfully deleted',

    ACCOUNT_UPDATE: 'Account successfully updated',
    ACCOUNT_AVATAR_UPDATE: 'Account avatar was updated successfully',

    CREATE_CHAT: 'Chat created successfully ',
    DELETE_CHAT: 'Chat deleted successfully ',

    MAIL_SENT_SUCCESS: 'mail sent success'
}

const PromiseAlert = {
    FETCH_NEWS_PENDING: "News fetching",
    FETCH_NEWS_SUCCESS: "News fetched successfully",
    FETCH_NEWS_ERROR: "Error to fetch news",

    FETCH_LOGIN_PENDING: "Log in",
    FETCH_LOGIN_SUCCESS: "Successfully logged in",
    FETCH_LOGIN_ERROR: "Error log in"

}



const PrimaryErrorAlert = {
    FETCH_CUSTOMERS: 'Error fetch customer',

    CREATED_NEWS: 'Fail to create news',
    UPDATED_NEWS: 'News fail to updated',
    DELETED_NEWS: 'News fail to deleted',

    CREATED_JOB_APPLICATION: 'Job application fail to created',
    UPDATED_JOB_APPLICATION: 'Job application fail to updated',
    DELETED_JOB_APPLICATION: 'Job application fail to deleted',

    CREATED_VACANCY: 'Vacancy fail to created',
    UPDATED_VACANCY: 'Vacancy fail to updated',
    DELETED_VACANCY: 'Vacancy fail to deleted',

    CREATED_PROJECT: 'Project fail to  created',
    UPDATED_PROJECT: 'Project fail to updated',
    DELETED_PROJECT: 'Project fail to deleted',

    ADD_EMPLOYEE_TO_PROJECT: 'Employee does not added to project',
    REMOVE_EMPLOYEE_FROM_PROJECT: 'Employee wasn\'t remove from project successfully',

    CREATED_ORDER: 'Order fail to created',
    UPDATED_ORDER: 'Order fail to updated',
    DELETED_ORDER: 'Order fail to deleted',

    CREATED_EMPLOYEE: 'Employee fail to created',
    UPDATED_EMPLOYEE: 'Employee fail to updated',
    DELETED_EMPLOYEE: 'Employee fail to deleted',

    ACCOUNT_UPDATE: 'Account fail to updated',
    ACCOUNT_AVATAR_UPDATE:'Fail to updated account avatar',

    CREATE_CHAT: 'Fail to add chat ',
    DELETE_CHAT: 'Fail to remove chat ',

    MAIL_SENT_SUCCESS: 'mail does not sent'

}

// export interface ErrorAlertMessage {
//     primary: PrimaryErrorAlert,
//     secondary?: string
// }

// show error message with addition alertMessage from server
const showAxiosErrorAlert = (message, error) => {
    let submessage = '';
    if(!message.secondary) {
        if(error.response.data.alertMessage) {
            submessage = error.response.data.alertMessage
        }
    }
    toast.error(`${message.primary} ${submessage}`,
        { autoClose: 2000})
}

const showAxiosSuccessAlert = (primary) => {
    toast.success(primary,{ autoClose: 1500 });
}


export {
    SimpleAlertMessage,
    PrimarySuccessAlert,
    PromiseAlert,
    PrimaryErrorAlert,
    showAxiosErrorAlert,
    showAxiosSuccessAlert,
}