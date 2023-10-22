import React, { Component } from 'react';

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
class Clock extends Component {
  constructor(props) {
    super(props);

    // Initialize the state with the current time
    this.state = {
      currentTime: new Date()
    };
  }

  componentDidMount() {
    // Update the current time every second
    this.intervalID = setInterval(() => {
      this.setState({
        currentTime: new Date()
      });
    }, 1000); // 1000 milliseconds = 1 second
  }

  componentWillUnmount() {
    // Clear the interval when the component unmounts
    clearInterval(this.intervalID);
  }

  render() {
    const { currentTime } = this.state;
    const formattedTime = currentTime.toLocaleTimeString();

    return (
      <div className='fixed right-0 bottom-0 p-6'>
        
        <p className='text-2xl'>{months[currentTime.getMonth()]} {currentTime.getDate()}, {currentTime.getFullYear()}   {formattedTime}</p>
      </div>
    );
  }
}

export default Clock;
