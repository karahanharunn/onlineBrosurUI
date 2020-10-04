import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgChevronRight(props) {
  return (
    <Svg
      className="ChevronRight_svg__w-6 ChevronRight_svg__h-6"
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
        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </Svg>
  );
}

export default SvgChevronRight;
