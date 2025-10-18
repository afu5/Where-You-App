'use client'

import dynamic from "next/dynamic"

const Map = dynamic(() => import("./EventMap"), { ssr:false })

export default Map