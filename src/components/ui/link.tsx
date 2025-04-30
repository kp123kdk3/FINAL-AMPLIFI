import NextLink from 'next/link'
import { ComponentProps } from 'react'

type LinkProps = ComponentProps<typeof NextLink>

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <NextLink className={className} {...props}>
      {children}
    </NextLink>
  )
} 