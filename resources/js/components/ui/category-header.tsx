import clsx from "clsx"

export default function CategoryHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={clsx(
        className,
        "-left-[var(--gutter-width)] 2xl:-translate-x-full 2xl:-translate-y-full 2xl:-rotate-90 top-0 origin-bottom-right text-left font-mono font-semibold text-sm uppercase tracking-widest max-sm:px-4 max-2xl:mb-4 max-2xl:px-2 sm:text-xs 2xl:absolute 2xl:text-right",
      )}
    >
      {children}
    </p>
  )
}
