export function OrbitDrawing() {
  return (
    <div className="orbit-paper-drawing" data-reveal="drawing" aria-hidden="true">
      <svg viewBox="0 0 560 390" fill="none" focusable="false">
        <path
          className="orbit-sheet orbit-sheet-back"
          d="M140 54C252 34 384 47 485 85L459 313c-109 34-235 36-347 3L140 54Z"
          fill="#dce7e9"
          stroke="#0b2136"
          strokeOpacity=".12"
        />
        <path
          className="orbit-sheet orbit-sheet-front"
          d="M85 87C197 62 331 74 440 114L417 300c-121 34-252 29-362-10L85 87Z"
          fill="#f4f1e9"
          stroke="#0b2136"
          strokeOpacity=".19"
        />
        <path
          className="orbit-paper-fold"
          d="M55 290c116 39 246 44 362 10M102 96l-18 171"
          stroke="#0b2136"
          strokeOpacity=".12"
        />
        <path
          d="M417 300c-14 10-28 17-45 21l-11-39 56 18Z"
          fill="#e6e1d5"
          stroke="#0b2136"
          strokeOpacity=".13"
        />
        <path
          className="orbit-flight-trail orbit-flight-trail-accent"
          d="M40 306C132 350 286 316 385 211"
          pathLength="1"
        />
        <path className="orbit-flight-trail" d="M40 306C132 350 286 316 385 211" pathLength="1" />
        <circle className="orbit-flight-point" cx="43" cy="308" r="4" />
        <g className="orbit-rocket" transform="translate(385 211) rotate(43.32)">
          <g className="orbit-rocket-float">
            <path
              className="orbit-rocket-exhaust"
              d="M-6 68Q-9 87 0 104Q9 87 6 68Z"
              fill="#d98d5c"
            />
            <path
              d="M0-57c13 9 19 25 19 47v48l18 20-3 12-24-8-10 13-10-13-24 8-3-12 18-20v-48c0-22 6-38 19-47Z"
              fill="#fbfaf6"
              stroke="#0b2136"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path d="M0-54c-3 12-4 22-4 31h8c0-9-1-19-4-31Z" fill="#bd6039" />
            <circle cx="0" cy="-17" r="10" fill="#0b2136" stroke="#bd6039" strokeWidth="2" />
            <circle cx="0" cy="-17" r="5.5" fill="#91a9b2" />
            <path d="M-14 19h28M-12 25h24" stroke="#83939a" strokeWidth="1.2" />
            <path d="M-9 47h18" stroke="#bd6039" strokeWidth="2" />
            <path d="M-6-2v13m12-13v13" stroke="#d4d8d2" strokeWidth="1.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}
