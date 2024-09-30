
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClasses } from '../redux/actions'
import ClassList from '../components/ClassList'

const Classes = () => {
  const dispatch = useDispatch()
  const { classes, loading, error } = useSelector((state) => state.classes)

  useEffect(() => {
    dispatch(fetchClasses())
  }, [dispatch])

  return (
    <div className="classes-page">
      <h1>Our Classes</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <ClassList classes={classes} />
      )}
    </div>
  )
}

export default Classes