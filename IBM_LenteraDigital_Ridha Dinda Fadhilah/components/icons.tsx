import type { SVGProps } from 'react';

export function LenteraLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="hsl(var(--primary))"
        d="M88 24v56a48 48 0 0 1-48 48H24v-48a48 48 0 0 1 48-48Z"
        transform="rotate(90 64 88)"
      />
      <path
        fill="hsl(var(--accent))"
        d="m142.9 146.9-46.3 46.3a8 8 0 0 1-11.3-11.3L128 145.3"
      />
      <path
        fill="hsl(var(--primary))"
        d="M216 112h-56a48 48 0 0 0-48 48v56h48a48 48 0 0 0 48-48Z"
      />
      <path
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M176 216V112h32"
      />
      <path
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="m142.9 146.9-46.3 46.3a8 8 0 0 1-11.3-11.3L128 145.3"
      />
      <path
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M112 160a48 48 0 0 0-48-48H40"
      />
      <path
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M216 112h-56a48 48 0 0 0-48 48v56h48a48 48 0 0 0 48-48Z"
      />
      <path
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        d="M88 24v56a48 48 0 0 1-48 48H24v-48a48 48 0 0 1 48-48Z"
        transform="rotate(90 64 88)"
      />
    </svg>
  );
}
