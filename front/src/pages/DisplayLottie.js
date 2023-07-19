import React, {Component, Suspense} from "react";
import Lottie from "react-lottie";


export default class DisplayLottie extends Component {
  render() {
    const animationData = this.props.animationData;
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData
    };

    return (
      <Suspense>
      <div style={this.props.style}>
        <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
      </div>
    </Suspense>
    );
  }
}
