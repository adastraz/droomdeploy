import axios from 'axios'
import history from '../utils/history'
import axiosWithAuth from '../utils/axiosWithAuth'
export const FETCHING_START = 'FETCHING_START';
export const FETCHING_ERROR = 'FETCHING_ERROR';
export const EMPLOYEE = 'EMPLOYEE';
export const LOGIN = 'LOGIN';
export const EMPLOYER = 'EMPLOYER';
export const FETCHING_COMPANYARRAY_SUCCESS = 'FETCHING_COMPANYARRAY_SUCCESS'
export const FETCHING_USERARRAY_SUCCESS = 'FETCHING_USERARRAY_SUCCESS'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const LOGOUT = 'LOGOUT'

export const newEmployee = (thing) => dispatch => {
    dispatch({ type: FETCHING_START })
    axios
        .post('https://dry-mesa-00229.herokuapp.com/api/register/user', thing)
            .then(res => {
                dispatch ({ type: EMPLOYEE, payload: res.data })
                axios
                    .post('https://dry-mesa-00229.herokuapp.com/api/login', thing)
                        .then(res => {
                            dispatch({ type: LOGIN, payload: res.data})
                            localStorage.setItem('token', res.data.token)
                            if (typeof res.data.company != "undefined") {
                                history.push(`/companies/${res.data.company.id}`)
                            }
                            history.push(`/users/${res.data.user.id}`)
                        })
                        .catch(err => {
                            dispatch({ type: FETCHING_ERROR, payload: err })
                            console.log('tyler look here ya seeeee', err)
                        })
            })
            .catch(err => {
                dispatch ({ type: FETCHING_ERROR, payload: err })
            })
}
export const newEmployer = (thing) => dispatch => {
    console.log('employer', thing)
    dispatch({ type: FETCHING_START })
    axios
        .post('https://dry-mesa-00229.herokuapp.com/api/register/company', thing)
            .then(res => {
                dispatch ({ type: EMPLOYER, payload: res.data })
                axios
                    .post('https://dry-mesa-00229.herokuapp.com/api/login', thing)
                        .then(res => {
                            dispatch({ type: LOGIN, payload: res.data})
                            localStorage.setItem('token', res.data.token)
                            if (typeof res.data.company != "undefined") {
                                history.push(`/companies/${res.data.company.id}`)
                            }
                            history.push(`/users/${res.data.user.id}`)
                        })
                        .catch(err => {
                            dispatch({ type: FETCHING_ERROR, payload: err })
                            console.log('tyler look here ya seeeee', err)
                        })
            })
            .catch(err => {
                dispatch ({ type: FETCHING_ERROR, payload: err })
            })
}
export const login = (thing) => dispatch => {
    console.log('LOGIN RESPONSE', thing)
    dispatch ({ type: FETCHING_START })
    axios
        .post('https://dry-mesa-00229.herokuapp.com/api/login', thing)
            .then(res => {
                dispatch({ type: LOGIN, payload: res.data})
                localStorage.setItem('token', res.data.token)
                if (typeof res.data.company != "undefined") {
                    history.push(`/companies/${res.data.company.id}`)
                }
                history.push(`/users/${res.data.user.id}`)
            })
            .catch(err => {
                dispatch({ type: FETCHING_ERROR, payload: err })
                console.log('tyler look here ya seeeee', err)
            })
}
export const fetchUser = (id) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .get(`/api/users/${id}`)
            .then(res => {
                dispatch({ type: EMPLOYEE, payload: res.data})
            })
            .catch(err => {
                dispatch ({ type: FETCHING_ERROR, payload: err })
            })
}
export const fetchCompany= (id) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .get(`/api/companies/${id}`)
            .then(res => {
                dispatch({ type: EMPLOYER, payload: res.data})
            })
            .catch(err => {
                dispatch ({ type: FETCHING_ERROR, payload: err })
            })
}
export const fetchCompanyArray = () => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .get(`/api/companies`)
            .then(res => {
                dispatch({ type: FETCHING_COMPANYARRAY_SUCCESS, payload: res.data})
            })
            .catch(err => {
                dispatch ({ type: FETCHING_ERROR, payload: err })
            })
}
export const fetchUserArray = () => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .get(`/api/users`)
            .then(res => {
                dispatch({ type: FETCHING_USERARRAY_SUCCESS, payload: res.data})
            })
            .catch(err => {
                dispatch ({ type: FETCHING_ERROR, payload: err })
            })
}
export const editUser = (user, id) => dispatch => {
    dispatch({ type: FETCHING_START })
    console.log("EDIT USER, user", user)
    axiosWithAuth()
        .put(`/api/users/${id}`, user)
            .then( res => {
                console.log(res)
                dispatch({ type: EMPLOYEE, payload: res.data})
            })
            .catch(err => {
                dispatch ({ type: FETCHING_ERROR, payload: err })
            })
}
export const editCompany = (company, id) => dispatch => {
    dispatch({ type: FETCHING_START })
    console.log("EDIT USER, user", company)
    axiosWithAuth()
        .put(`/api/companies/${id}`, company)
            .then( res => {
                console.log(res)
                dispatch({ type: EMPLOYER, payload: res.data})
            })
            .catch(err => {
                dispatch ({ type: FETCHING_ERROR, payload: err })
            })
}
export const deleteUser = (id) => dispatch => {
    dispatch({ type: FETCHING_START})
    axiosWithAuth()
        .delete(`/api/users/${id}`)
            .then( res => {
                history.push('/')
                localStorage.clear('token')
            })
            .catch(err => {
                dispatch ({ type: FETCHING_ERROR, payload: err })
            })
} 
export const deleteCompany = (id) => dispatch => {
    dispatch({ type: FETCHING_START})
    axiosWithAuth()
        .delete(`/api/companies/${id}`)
            .then( res => {
                history.push('/')
                localStorage.clear('token')
            })
            .catch(err => {
                dispatch ({ type: FETCHING_ERROR, payload: err.response})
            })
} 
export const clearError = () => dispatch => {
    dispatch ({ type: CLEAR_ERROR })
    history.push('/signup')
    alert('Unsucessful signup, please make sure you met the password requirements, or use another username')
}
export const logout = () => dispatch => {
    dispatch ({ type: LOGOUT })
    localStorage.clear('token')
    history.push('/')
}