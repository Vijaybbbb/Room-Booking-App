import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SkeletonCard from '../Skeleton/SkeletonCard'
import { Box, Card, CardBody, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'

const Notification = () => {

  const notify = () => toast("Wow so easy!");

  return (
    <div style={{background:'',height:''}}>
      
    </div>
  )
}

export default Notification
