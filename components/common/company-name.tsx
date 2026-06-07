import Link from 'next/link'

type TextSize = 'sm' | 'md' | 'lg' | 'xl'

interface CompanyNameProps {
  size?: TextSize
}

const sizeMap: Record<TextSize, string> = {
  sm: 'text-xl',
  md: 'text-base sm:text-lg',
  lg: 'text-xl sm:text-2xl',
  xl: 'text-2xl sm:text-3xl',
}

const CompanyName = ({ size = 'lg' }: CompanyNameProps) => {
  return (
    <Link
      href="/"
      className={`
        ${sizeMap[size]}
        font-bold
        text-[color:var(--primary)]
        cursor-pointer
        select-none
        transition-colors
        hover:opacity-80
      `}
    >
      Shelly Collections
    </Link>
  )
}

export default CompanyName