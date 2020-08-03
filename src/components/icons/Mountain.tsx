import * as React from "react";

function SvgMountain(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={32} height={24} viewBox="0 0 32 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 24L10 0.5L16.5 10.5L19.5 5.5L32 24H0ZM9 10L10.5 7L12.5 10H9ZM18.5 13.5L20 11L21.5 13.5H18.5Z"
        fill="#89C610"
      />
    </svg>
  );
}

export default SvgMountain;
