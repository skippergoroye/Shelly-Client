'use client'

interface LoadingBarProps {
  loadingText?: string
}

const LoadingBar = ({ loadingText = 'Loading...' }: LoadingBarProps) => {
  return (
    <div className="flex flex-col items-start gap-2 place-items-center">
      <p className="text-sm text-gray-500">{loadingText}</p>

      <div className="w-40 h-[3px] bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-[color:var(--primary)] rounded-full animate-[progress_1.4s_ease-in-out_infinite]" />
      </div>
    </div>
  )
}

export default LoadingBar