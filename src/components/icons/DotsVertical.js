import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgDotsVertical(props) {
  return (
    <Svg
      className="DotsVertical_svg__w-6 DotsVertical_svg__h-6"
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
        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
      />
    </Svg>
  );
}

export default SvgDotsVertical;
