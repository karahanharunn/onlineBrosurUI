import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgOpen(props) {
  return (
    <Svg
      className="open_svg__w-6 open_svg__h-6"
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
        d="M4 8h16M4 16h16"
      />
    </Svg>
  );
}

export default SvgOpen;
