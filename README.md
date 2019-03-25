# udp-echo

UDP echo command line utility.

## Installation

    npm i udp-echo -g
  
## Usage

    udp-echo
  
This will start an UDP server listening at 41234.
For every message received it will responde back an echo message composed by `echo[{ORIGINAL_MESSAGE}]`.

Change listening port by specifing the `PORT` environment variable.

## Send

You can also use this tool to send UDP datagrams from console:

    DESTINATION=your-destinationserver:port udp-echo

Then you can write message inside the console and send it with Enter key.
