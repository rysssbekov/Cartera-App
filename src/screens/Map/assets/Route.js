import * as React from "react"
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from "react-native-svg"

function Route(props) {
  return (
    <Svg
      width={20}
      height={92}
      viewBox="0 0 20 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10 10v72"
        stroke="url(#paint0_linear_3_174)"
        strokeWidth={2}
        strokeLinecap="square"
        strokeDasharray={4}
      />
      <Circle
        cx={10}
        cy={10}
        r={7}
        fill="#fff"
        stroke="#446ED2"
        strokeWidth={6}
      />
      <Circle
        cx={10}
        cy={82}
        r={7}
        fill="#fff"
        stroke="#38BE67"
        strokeWidth={6}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_3_174"
          x1={9.5}
          y1={10}
          x2={9.5}
          y2={82}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#446ED2" />
          <Stop offset={0.446023} stopColor="#446ED2" />
          <Stop offset={1} stopColor="#38BE67" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default Route
