import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgOpen(props) {
  return (
    <Svg
      className="prefix__w-6 prefix__h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
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
