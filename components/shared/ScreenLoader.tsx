'use client'

import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import Image from 'next/image'
import Logo from '@/public/images/IC360-logo.svg'
import { Spinner } from '../ui/spinner'

interface ScreenLoaderProps {
  open: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  loader?: boolean
}

const ScreenLoader: React.FC<ScreenLoaderProps> = ({
  open,
  setOpen,
  loader = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen ?? (() => {})}>
      <DialogContent className="flex justify-center items-center w-full h-full bg-transparent border-none outline-none shadow-none">
        {loader ? (
          <Spinner />
        ) : (
          <h1 className="text-3xl font-bold animate-pulse">
            Shelly Collections
          </h1>

          // If using logo instead:
          // <Image
          //   src={Logo}
          //   alt="logo"
          //   className="animate-pulse"
          //   priority
          // />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ScreenLoader