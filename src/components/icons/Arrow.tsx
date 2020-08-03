import * as React from "react";

function SvgArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={46} height={100} viewBox="0 0 46 100" fill="none" {...props}>
      <path
        d="M46 47.9381L0 0C0 0 17.2749 27.7975 17.8065 47.9381C18.3777 69.5827 0 100 0 100L46 47.9381Z"
        fill="#FDFEE7"
      />
    </svg>
  );
}

export default SvgArrow;
