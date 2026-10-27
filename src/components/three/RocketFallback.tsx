import { useId } from "react";

export function RocketFallback({ className = "home-rocket-poster" }: { className?: string }) {
  const id = useId();

  return (
    <svg className={className} viewBox="0 0 400 520" fill="none" aria-hidden="true">
      <defs>
        <linearGradient
          id={`${id}-shell`}
          x1="142"
          y1="220"
          x2="258"
          y2="220"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8798a1" />
          <stop offset=".14" stopColor="#d8e0df" />
          <stop offset=".39" stopColor="#fffef7" />
          <stop offset=".7" stopColor="#e0e6e3" />
          <stop offset="1" stopColor="#84949d" />
        </linearGradient>
        <linearGradient
          id={`${id}-metal`}
          x1="150"
          y1="370"
          x2="250"
          y2="370"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#344957" />
          <stop offset=".3" stopColor="#aebfc4" />
          <stop offset=".52" stopColor="#edf1ec" />
          <stop offset=".77" stopColor="#738894" />
          <stop offset="1" stopColor="#435864" />
        </linearGradient>
        <radialGradient
          id={`${id}-glass`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(27 42 -43 27 181 186)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7292a2" />
          <stop offset=".44" stopColor="#274557" />
          <stop offset="1" stopColor="#0a1d2a" />
        </radialGradient>
        <radialGradient id={`${id}-shadow`}>
          <stop stopColor="#000" stopOpacity=".25" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="194" cy="466" rx="92" ry="15" fill={`url(#${id}-shadow)`} />
      <g transform="rotate(29 200 260)">
        <path
          d="M158 315c-25 13-47 54-48 88 16 6 36-1 54-17l13-48Zm84 0c25 13 47 54 48 88-16 6-36-1-54-17l-13-48Z"
          fill={`url(#${id}-metal)`}
          stroke="#87979d"
          strokeWidth="2"
        />
        <path
          d="M181 385 171 423q29 13 58 0l-10-38Z"
          fill={`url(#${id}-metal)`}
          stroke="#d0d8d5"
          strokeWidth="2"
        />
        <path d="M178 403h44m-46 6h48m-48 6h48" stroke="#344d5a" strokeOpacity=".7" />
        <path
          d="M200 54c-34 0-58 79-59 150l4 136c1 28 15 42 31 47h48c16-5 30-19 31-47l4-136c-1-71-25-150-59-150Z"
          fill={`url(#${id}-shell)`}
        />
        <path d="M143 322q57 11 114 0m-113 11q56 11 112 0" stroke="#70828a" strokeWidth="1.5" />
        <path d="M145 337q55 11 110 0" stroke="#bd6940" strokeWidth="3" />
        <path d="M154 155q46-5 92 0" stroke="#a6b1b0" strokeWidth="1.5" />
        <ellipse cx="200" cy="218" rx="29" ry="34" fill="#8d9da2" />
        <ellipse
          cx="200"
          cy="218"
          rx="25"
          ry="30"
          fill="#263944"
          stroke="#526975"
          strokeWidth="2"
        />
        <ellipse cx="200" cy="218" rx="20" ry="25" fill={`url(#${id}-glass)`} />
        <path
          d="M187 201q8-7 17-7"
          stroke="#d9edf1"
          strokeOpacity=".78"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M198 378v47l2 8 2-8v-47" fill="#8799a0" />
        <path d="M244 277v42" stroke="#c77a51" strokeWidth="2.5" strokeLinecap="round" />
        <g fill="#647b85">
          <circle cx="160" cy="323" r="2" />
          <circle cx="180" cy="328" r="2" />
          <circle cx="200" cy="330" r="2" />
          <circle cx="220" cy="328" r="2" />
          <circle cx="240" cy="323" r="2" />
        </g>
      </g>
    </svg>
  );
}
