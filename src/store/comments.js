import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service.js'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: commentsReducer, actions } = commentsSlice
const { commentsRequested, commentsReceived, commentsRequestFiled } = actions

// function isOutDated (date) {
//   if (Date.now() - date > 10 * 60 * 100) {
//     return true
//   }
//   return false
// }

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentService.getComments(userId)
    dispatch(commentsReceived(content))
  } catch (error) {
    dispatch(commentsRequestFiled(error.message))
  }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading

export default commentsReducer