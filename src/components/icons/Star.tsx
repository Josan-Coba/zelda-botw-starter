import * as React from "react";

function SvgStar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={96} height={91} viewBox="0 0 96 91" fill="none" {...props}>
      <path
        d="M48 0L59.2257 34.5491H95.5528L66.1636 55.9017L77.3893 90.4509L48 69.0983L18.6107 90.4509L29.8364 55.9017L0.447174 34.5491H36.7743L48 0Z"
        fill="#FDFDE7"
      />
    </svg>
  );
}

export default SvgStar;
