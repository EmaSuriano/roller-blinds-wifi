# Nodemcu configuration

Inside ConfiguredFirmata folder you will find the file that will be uploaded to
your Nodemcu chip, in this case is just a copy from
[this repository](https://github.com/firmata/ConfigurableFirmata/blob/master/examples/ConfigurableFirmataWiFi/ConfigurableFirmataWiFi.ino).

## Network configuration

Beside the length of the config file, there are only a few things that you have
to change from it:

* Your IP address (between commas): `Line 113 - #define SERVER_IP 192, 168, 1,
  100`
* Your network name: `Line 117 - char ssid[] = "NETWORK_NAME";`
* Your network password: `Line 146 - char wpa_passphrase[] =
  "NETWORK_PASSWORD";`

## Upload your config to Nodemcu

There are many ways to upload your code to Nodemcu, what we used is:

* Using [Arduino IDE](https://www.arduino.cc/en/Main/Software).
* Using
  [Arduino extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.vscode-arduino).

Independently of which way you choose there are some values to pick setup before
uploading the code:

* Install the Nodemcu driver and set it as your board.
* Set the CPU frequency to 80 MHz
* Set the Flash Size to 4M
* Change the Upload Speed to 115200
* Select the port that you have connected your Nodemcu on your computer (for
  Windows will be COMx, taking x as a port number).

Then upload the code into your board, you will see the nodecmu led flashing
while the code is being uploaded and when it's finished it will remain still.

## Check if everything is properly setup

One of the things that I was very worried at first was, how to know if my chip
was correctly connected to my network, so what I did to check this is:

* While the uploading proccess is running, open the Serial Monitor from Arduino
  IDE or Visual Studio Code
* A terminal will appear without any information.
* When then the uploading process finished you will see a message like this:

  ```arduino
  ConfigurableFirmataWiFi will attempt a WiFi connection using the ESP8266 WiFi
  library.
  IP will be requested from DHCP ...

  Attempting to connect to WPA SSID:
  NETWORK_NAME WiFi setup done ..

  SSID: NETWORK_NAME
  IP Address: 192.168.1.102
  signal strength (RSSI): -60 dBm
  ```

* Copy the IP Adress
* Open your terminal, type `ping [IP Adress]` and execute the command.

  ```bash
  Pinging 192.168.1.102 with 32 bytes of data:
  Reply from 192.168.1.102: bytes=32 time=3ms TTL=128
  Reply from 192.168.1.102: bytes=32 time=3ms TTL=128
  Reply from 192.168.1.102: bytes=32 time=2ms TTL=128
  Reply from 192.168.1.102: bytes=32 time=2ms TTL=128

  Ping statistics for 192.168.1.102:
      Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
  Approximate round trip times in milli-seconds:
      Minimum = 2ms, Maximum = 3ms, Average = 2ms
  ```

* If you received all packets sent were received your nodemcu is succesfully
  connected!
