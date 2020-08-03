import * as React from 'react'
import { motion, SVGMotionProps } from 'framer-motion'

function SvgArrowNoCurve(props: SVGMotionProps<SVGSVGElement>) {
  return (
    <motion.svg
      width={46}
      height={100}
      viewBox="0 0 46 100"
      fill="none"
      {...props}
    >
      <path d="M46 47.9381L0 0L17 47.9381L0 100L46 47.9381Z" fill="#FDFEE7" />
    </motion.svg>
  )
}

export default SvgArrowNoCurve
