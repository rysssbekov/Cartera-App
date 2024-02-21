import * as React from "react"
import Svg, { G, Path, Ellipse } from "react-native-svg"

function Location(props) {
  return (
    <Svg
      width={14}
      height={16}
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        stroke="#C5C9D2"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 6.545C13 11.636 6.5 16 6.5 16S0 11.636 0 6.545C0 2.93 2.91 0 6.5 0S13 2.93 13 6.545v0z"
        />
        <Ellipse cx={6.50004} cy={6.54547} rx={2.16667} ry={2.18182} />
      </G>
    </Svg>
  )
}

export default Location
