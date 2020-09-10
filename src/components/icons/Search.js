import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgSearch(props) {
  return (
    <Svg
      className="search_svg__w-6 search_svg__h-6"
      fill="none"
      stroke={props.color}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </Svg>
  );
}

export default SvgSearch;
