import React from 'react'
import { Skeleton } from '@mui/material'

export default function MySkeketon({...props}) {
  return (
    <Skeleton style={{transform: 'scale(1)'}} {...props}/>
  )
}
