import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgChevron(props) {
  return (
    <Svg
      className="chevron_svg__w-6 chevron_svg__h-6"
      fill="none"
      stroke="black"
      viewBox="0 0 24 24"
      width="10"
      height="10"
      {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </Svg>
  );
}

export default SvgChevron;
