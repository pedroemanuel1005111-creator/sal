import { useId } from "react";

export default function Logo({
  size = 48,
  showText = false,
}: {
  size?: number;
  showText?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const g1 = `jp-g1-${id}`;
  const g2 = `jp-g2-${id}`;
  const silver = `jp-silver-${id}`;
  const glow = `jp-glow-${id}`;

  if (showText) {
    return (
      <svg
        width={size * 4.2}
        height={size * 1.9}
        viewBox="0 0 520 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Jovens Programadores"
      >
        <defs>
          <linearGradient id={g1} x1="40" y1="20" x2="220" y2="180">
            <stop offset="0%" stopColor="#5EE7FF" />
            <stop offset="42%" stopColor="#2B74FF" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id={g2} x1="180" y1="30" x2="360" y2="180">
            <stop offset="0%" stopColor="#5C7CFF" />
            <stop offset="55%" stopColor="#8B2CF5" />
            <stop offset="100%" stopColor="#D946EF" />
          </linearGradient>
          <linearGradient id={silver} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#D9DEE9" />
            <stop offset="100%" stopColor="#8B95A7" />
          </linearGradient>
          <filter id={glow} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform="translate(8 0)">
          <path d="M98 28H192C225 28 250 53 250 86V103C250 140 225 165 188 165H144V202L116 178V140H182C201 140 214 127 214 108V88C214 69 201 56 182 56H146V136C146 166 127 184 98 184H60L37 161H92C109 161 118 152 118 135V56H80L104 28Z" fill={`url(#${g2})`} stroke="#B34DFF" strokeWidth="1.1" filter={`url(#${glow})`} />
          <path d="M104 28H42L18 53H82V133C82 153 71 161 55 161H14L36 184H60C93 184 110 166 110 133V56H146L122 28H104Z" fill={`url(#${g1})`} stroke="#6BE7FF" strokeWidth="1.1" filter={`url(#${glow})`} />
          <g fill={`url(#${g1})`} filter={`url(#${glow})`}>
            <rect x="0" y="92" width="44" height="7" rx="3.5" />
            <rect x="0" y="106" width="30" height="7" rx="3.5" />
            <rect x="0" y="120" width="54" height="7" rx="3.5" />
            <rect x="48" y="92" width="21" height="7" rx="3.5" />
            <rect x="37" y="106" width="20" height="7" rx="3.5" />
            <rect x="60" y="120" width="24" height="7" rx="3.5" />
          </g>
          <g stroke={`url(#${g2})`} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${glow})`}>
            <path d="M157 84 143 98 157 112" />
            <path d="M197 84 211 98 197 112" />
            <path d="M184 78 170 118" />
          </g>
        </g>

        <text x="260" y="142" textAnchor="middle" fontSize="58" fontWeight="800" letterSpacing="14" fill={`url(#${silver})`}>
          JOVENS
        </text>
        <text x="260" y="188" textAnchor="middle" fontSize="23" fontWeight="600" letterSpacing="9" fill={`url(#${g2})`}>
          &lt; PROGRAMADORES &gt;
        </text>
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 260 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Jovens Programadores"
    >
      <defs>
        <linearGradient id={g1} x1="40" y1="20" x2="220" y2="180">
          <stop offset="0%" stopColor="#5EE7FF" />
          <stop offset="42%" stopColor="#2B74FF" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id={g2} x1="180" y1="30" x2="360" y2="180">
          <stop offset="0%" stopColor="#5C7CFF" />
          <stop offset="55%" stopColor="#8B2CF5" />
          <stop offset="100%" stopColor="#D946EF" />
        </linearGradient>
        <filter id={glow} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M98 28H192C225 28 250 53 250 86V103C250 140 225 165 188 165H144V202L116 178V140H182C201 140 214 127 214 108V88C214 69 201 56 182 56H146V136C146 166 127 184 98 184H60L37 161H92C109 161 118 152 118 135V56H80L104 28Z"
        fill={`url(#${g2})`}
        stroke="#B34DFF"
        strokeWidth="1.1"
        filter={`url(#${glow})`}
      />
      <path
        d="M104 28H42L18 53H82V133C82 153 71 161 55 161H14L36 184H60C93 184 110 166 110 133V56H146L122 28H104Z"
        fill={`url(#${g1})`}
        stroke="#6BE7FF"
        strokeWidth="1.1"
        filter={`url(#${glow})`}
      />
      <g fill={`url(#${g1})`} filter={`url(#${glow})`}>
        <rect x="0" y="92" width="44" height="7" rx="3.5" />
        <rect x="0" y="106" width="30" height="7" rx="3.5" />
        <rect x="0" y="120" width="54" height="7" rx="3.5" />
        <rect x="48" y="92" width="21" height="7" rx="3.5" />
        <rect x="37" y="106" width="20" height="7" rx="3.5" />
        <rect x="60" y="120" width="24" height="7" rx="3.5" />
      </g>
      <g stroke={`url(#${g2})`} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${glow})`}>
        <path d="M157 84 143 98 157 112" />
        <path d="M197 84 211 98 197 112" />
        <path d="M184 78 170 118" />
      </g>
    </svg>
  );
}
