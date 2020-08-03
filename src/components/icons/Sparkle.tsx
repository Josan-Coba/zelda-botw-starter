import * as React from "react";

function SvgSparkle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={53} height={53} viewBox="0 0 53 53" fill="none" {...props}>
      <path
        d="M26.5 0C26.5 0 27.9621 13.6473 33.6574 19.3426C39.3527 25.0379 53 26.5 53 26.5C53 26.5 39.3527 27.9621 33.6574 33.6574C27.9621 39.3527 26.5 53 26.5 53C26.5 53 25.0379 39.3527 19.3426 33.6574C13.6473 27.9621 0 26.5 0 26.5C0 26.5 13.6473 25.0379 19.3426 19.3426C25.0379 13.6473 26.5 0 26.5 0Z"
        fill="#C4C4C4"
      />
    </svg>
  );
}

export default SvgSparkle;
