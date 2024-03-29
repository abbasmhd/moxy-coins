import React, { Component } from "react";
import "./ScrollButton.css";

export default class ScrollButton extends Component<any, any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      intervalId: 0
    };
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(() => this.scrollStep(), this.props.delayInMs);
    this.setState({ intervalId });
  }

  render() {
    return (
      <button className="scroll" title="Back to top" onClick={() => this.scrollToTop()}>
        <span className="arrow-up fa fa-chevron-up" />
      </button>
    );
  }
}
