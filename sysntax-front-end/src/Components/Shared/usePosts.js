import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllllPosts } from '../../redux/features/postSection/allPostSlice'

const usePosts = (params) => {

    let { isLoading, error, posts } = useSelector(state => state?.allPosts)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllllPosts(params))
    }, [])


  return (
     {isLoading, error, posts }
  )
}

export default usePosts;