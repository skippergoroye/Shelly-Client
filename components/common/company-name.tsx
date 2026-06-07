import Link from 'next/link'

const CompanyName = () => {
  return (
    <Link
      href="/"
      className="
        text-xl sm:text-2xl
        font-bold
        text-[color:var(--primary)]
        cursor-pointer
        select-none
        transition-colors
        hover:opacity-80
      "
    >
      Shelly Collections
    </Link>
  )
}

export default CompanyName