import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgDelete(props) {
  return (
    <Svg
      className="delete_svg__w-6 delete_svg__h-6"
      fill="none"
      stroke="gray"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </Svg>
  );
}

export default SvgDelete;
