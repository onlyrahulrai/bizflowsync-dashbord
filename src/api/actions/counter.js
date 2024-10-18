import { DECREMENT } from "constants/types"
import { INCREMENT } from "constants/types"

export const increment = () => (dispatch) => {
    dispatch({
        type:INCREMENT
    })
}

export const decrement = () => (dispatch) => {
    dispatch({
        type:DECREMENT
    })
}