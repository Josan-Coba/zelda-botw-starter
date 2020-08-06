import React from 'react'
import { motion } from 'framer-motion'
import { Sparkle } from './icons'

const SparkleAnimation: React.FC = () => {
  return (
    <motion.div
      animate={{ scale: [0, 1, 0], rotate: [0, 90, 180] }}
      className="absolute top-0 right-0"
      transition={{ loop: Infinity, ease: 'easeInOut', duration: 1 }}
    >
      <Sparkle className="fill-current text-zelda-lightYellow w-4 h-4 m-2" />
    </motion.div>
  )
}

export default SparkleAnimation
