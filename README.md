# roller-blinds-wifi

This a project made with nodemcu and johnny five to control any roller blinds
via Wi-fi

## Setup your board

// TODO: explain this part better pls

The first thing you have to do is to set your network configuration, fill the
following values inside wifiConfig.h:

* Your IP address (between commas): `Line 113 - #define SERVER_IP 192, 168, 1,
  100`
* Your network name: `Line 117 - char ssid[] = "NETWORK_NAME";`
* Your network password: `Line 146 - char wpa_passphrase[] =
  "NETWORK_PASSWORD";`

Then upload the code into your board to leave the configuration inside it.
