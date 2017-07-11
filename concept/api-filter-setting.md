## Filter options

Filter data is required in three different contexts:
- default filter options
  - all filter options generally available (like when no filter is set at all)
- available filter options
  - remaining filter options when filtered deeper into the funnel
  - not required in first step(s)
- active filter options
  - options that are currently set


### Two approaches for the data structure of filters

The following example assumes that the user wants results for 2 or more participants.

#### 1. All-in-one
```
{
  "participants": {
    "participantsMin": {
      "default": 2,
      "active": 4,
      "options": [{
        "value": 1,
        "avlbl": true
      }, {
        "value": 2,
        "avlbl": true
      }, {
        "value": 4,
        "avlbl": true
      }]
    },
    "participantsMax": {
      "default": null,
      "active": null,
      "options": [{
        "value": 1,
        "avlbl": false
      },{
        "value": 2,
        "avlbl": false
      },{
        "value": 4,
        "avlbl": true
      }]
    }
  },
  "price": {
    "priceMin": {
      // ...
    },
    "priceMax": {
      // ...
    }
    // ...
  }
}
```

#### 2. Separate lists

##### 2.1. Default options ( = all )
```
{
  "participants": {
    "participantsMin": [{
      "value": 1
    },{
      "value": 2
    },{
      "value": 4
    }],
    "participantsMax": [{
      "value": 1
    },{
      "value": 2
    },{
      "value": 4
    }]
  },
  "price": {
    "priceMin": {
      // ...
    },
    "priceMax": {
      // ...
    }
  }
  // ...
}
```
##### 2.2. Available options
```
{
  "participants": {
    "participantsMin": [1, 2, 4],
    "participantsMax": [4]
  },
  "price": {
    "priceMin": [ /* ... */ ],
    "priceMax": [ /* ... */ ]
  }
  // ...
}
```
##### 2.2. Active options
```
{
  "participants": {
    "participantsMin": 4,
    "participantsMax": null
  },
  "price": {
    // ...
  }
  // ...
}
```
