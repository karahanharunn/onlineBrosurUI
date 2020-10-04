import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgChevronLeft(props) {
  return (
    <Svg
      className="ChevronLeft_svg__w-6 ChevronLeft_svg__h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
      />
    </Svg>
  );
}

export default SvgChevronLeft;
