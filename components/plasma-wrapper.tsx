"use client"

import dynamic from "next/dynamic"

const Plasma = dynamic(() => import("@/components/plasma"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-background" />,
})

interface PlasmaWrapperProps {
  color: string
  speed: number
  direction: "forward" | "reverse"
  scale: number
  opacity: number
  mouseInteractive: boolean
}

export default function PlasmaWrapper(props: PlasmaWrapperProps) {
  return <Plasma {...props} />
}
