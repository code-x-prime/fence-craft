import Image from 'next/image'

/**
 * The FENCECRAFT logo with no box behind it. Two files of the same artwork:
 * the original (dark slate + teal) for light backgrounds, and a reversed one
 * (slate lettering turned white, teal untouched) for dark backgrounds.
 * `onDark` cross-fades between them, so it can follow a header that changes
 * from transparent-dark to solid-light. Size with a height class (e.g. `h-12`);
 * width follows the 840:419 ratio.
 */
export function Logo({
  className = '',
  priority = false,
  onDark = false,
}: {
  className?: string
  priority?: boolean
  onDark?: boolean
}) {
  const fade = 'transition-opacity duration-300'
  return (
    <span className={`relative inline-block ${className}`}>
      <Image
        src="/fencecraft-logo.png"
        alt="FENCECRAFT, engineered to protect"
        width={840}
        height={419}
        priority={priority}
        sizes="260px"
        className={`h-full w-auto ${fade} ${onDark ? 'opacity-0' : 'opacity-100'}`}
      />
      <Image
        src="/fencecraft-logo-light.png"
        alt=""
        aria-hidden
        width={840}
        height={419}
        priority={priority}
        sizes="260px"
        className={`absolute inset-0 h-full w-auto ${fade} ${onDark ? 'opacity-100' : 'opacity-0'}`}
      />
    </span>
  )
}
