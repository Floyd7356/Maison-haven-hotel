interface MonogramProps {
  className?: string;
  tone?: 'dark' | 'light';
}

export function MonogramMH({ className = 'w-8 h-8', tone = 'dark' }: MonogramProps) {
  const frameStroke = tone === 'dark' ? '#A58A64' : '#A58A64';
  const letterPrimary = tone === 'dark' ? '#292824' : '#F2EDE3';
  const letterAccent = '#A58A64';

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        stroke={frameStroke}
        strokeWidth="1.25"
        strokeOpacity="0.65"
      />
      <path
        d="M15 44V20L26.5 35.5L38 20V44"
        stroke={letterPrimary}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M38 32H49M49 20V44"
        stroke={letterAccent}
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}

interface WordmarkProps {
  tone?: 'dark' | 'light';
  className?: string;
}

export function MaisonHavenWordmark({ tone = 'dark', className = '' }: WordmarkProps) {
  const colorClass = tone === 'dark' ? 'text-[#292824]' : 'text-[#F2EDE3]';
  return (
    <span
      className={`font-serif text-lg md:text-[21px] font-medium tracking-[0.22em] uppercase whitespace-nowrap shrink-0 ${colorClass} ${className}`}
    >
      MAISON HAVEN
    </span>
  );
}
