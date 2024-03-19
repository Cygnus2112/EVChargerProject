EV Charger Project

PLEASE NOTE: In order to run this on your machine, you'll need to add a .env file with a OPEN_CHARGE_API_KEY.

My approach was pretty simple:
1) Fetch user's location
2) Render map with user's location at the center
3) Fetch the boundaries to send to the Open Charge Map API
4) Render charger locations as markers on the map
5) Display information about the marker when selected
6) Send API call when "Start Charging" button is pressed and Alert is confirmed

TODOs:

-- Styling and animations!

-- When a marker is pressed, render the information as part of a horizontal flatlist (of all locations returned by the current api call) at the bottom of the map, which the user can scroll through

-- Pagination. Currently I've set `maxresults=20` for the Open Charg Map api call in order to avoid cluttering the map too much. 

-- Logic for dismissing the Charger Location info at the bottom of the map

-- Use a modal instead of an Alert for "Start Charging" confirmation

-- Track the user's location and update the map accordingly when they move 

-- Loading/status indicators etc.

-- Error handling

-- Lots more

![Simulator Screenshot - iPhone 14 - 2024-03-18 at 16 58 07](https://github.com/Cygnus2112/EVChargerProject/assets/12438838/cd874b00-a0c1-4ed9-86ff-d5b2130be2f5)

![Simulator Screenshot - iPhone 14 - 2024-03-18 at 16 58 23](https://github.com/Cygnus2112/EVChargerProject/assets/12438838/da3aa165-0fd3-4b26-a9b0-4290470cf616)

![Simulator Screenshot - iPhone 14 - 2024-03-18 at 16 58 28](https://github.com/Cygnus2112/EVChargerProject/assets/12438838/8ded97d6-a4bf-4513-bf25-5293b79e4be4)

