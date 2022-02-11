export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USERS = 'SET_USER';
export const SET_UPDATEUSERS = "UPDATE_USER";

export function setMovies(value) {
    return {
        type: SET_MOVIES,
        value
    };
}

export function setFilter(value) {
    return {
        type: SET_FILTER,
        value
    };
}

export function setUser(value) {
    return {
        type: SET_USERS,
        value
    };
}

export function updateUser(value) {
    return {
        type: SET_UPDATEUSERS,
        value,
    };
}