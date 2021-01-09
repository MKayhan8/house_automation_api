

## House Automation API 
Basic RESTful API for [house_automation](https://github.com/MKayhan8/house_automation)\
It listens [http://localhost:9000](http://localhost:9000) and contains `get` and `patch` methods

**contains `db.json` in it and data is like below**

```
{
"rooms": [
    {
      "roomName": "Kitchen",
      "powerWeekly": [
        310,
        120,
        80,
        170,
        130,
        312,
        185
      ],
      "lights": "close",
      "temperature": 42,
      "temperatureWeekly": [
        21,
        12,
        28,
        17,
        23,
        21,
        18
      ],
      "stove": "close",
      "dishwasher": "open",
      "curtains": "open"
    },
    {
      "roomName": "Living room",
      "powerWeekly": [
        120,
        340,
        823,
        170,
        420,
        522,
        485
      ],
      "lights": "open",
      "temperature": 18,
      "temperatureWeekly": [
        11,
        15,
        23,
        12,
        25,
        31,
        28
      ],
      "tv": "close",
      "curtains": "open"
    }]
    }
```

* `npm install` 
    - installs package dependencies
* `npm start`
    - Start to listen [http://localhost:9000](http://localhost:9000) 


