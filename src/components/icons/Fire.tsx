import * as React from "react";

function SvgFire(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={27} viewBox="0 0 24 27" fill="none" {...props}>
      <path
        d="M0.5 15C0.5 8.64873 13.5 0.5 13.5 0.5C13.5 0.5 10.6659 6.79532 11 11.5C11.1824 14.0686 11.8203 15.5 13.5 15.5C15.1797 15.5 15.4759 13.7486 16 11.5C16.5151 9.29008 16 7 16 7C16 7 23.0218 11.7856 23.5 15C24.4345 21.2822 18.3513 26.5 12 26.5C5.64873 26.5 0.5 21.3513 0.5 15Z"
        fill="#FC3D33"
      />
    </svg>
  );
}

export default SvgFire;
