# NodeMcu Configuration

In this section we'll learn how to program our NodeMcu chip so we can communicate with it and also he can move up/down our curtains. Let's start with the most important point.

## Setup your board

There a few requirements that we need to have before uploading our code:

1. Download Arduino IDE.
2. Install esp8226 board in Arduino.
3. Instal ConfiguredFirmata in Arduino.

After that we can start to set up your network configuration, open the ConfiguratedFirmata.ino and fill the following values:

* Your IP address (between commas): `Line 113 - #define SERVER_IP 192, 168, 1, 100`
* Your network name: `Line 117 - char ssid[] = "NETWORK_NAME";`
* Your network password: `Line 146 - char wpa_passphrase[] = "NETWORK_PASSWORD";`

Click on Verify, check the console output it should display something like this:

```c
Sketch uses 262993 bytes (25%) of program storage space. Maximum is 1044464 bytes.
Global variables use 35196 bytes (42%) of dynamic memory, leaving 46724 bytes for local variables. Maximum is 81920 bytes.
```

Then upload the code into your board to leave the configuration inside it, it should appear like this:

```c
Uploading...
Uploading 243808 bytes from C:\Users\USERNAME\AppData\Local\Temp\arduino_build_405751/ConfiguredFirmata.ino.bin to flash at 0x00000000
................................................................................ [ 33% ]
................................................................................ [ 66% ]
...............................................................................  [ 100% ]
```

## Change utils of FirmataStepper

This step is to properly move our 28BYJ-48, the short explanation is because our motor has a different way of working than the default inside Firmata.

To replace its behaviour we have to:

* Go to Arduino's library folder (In Windows the folder is located in `C:\Users\USERNAME\Documents\Arduino\libraries`)
* Open ConfigurableFirmata folder
* Open utils folder
* Replace FirmataStepper.cpp with the one of this repository utils folder.
