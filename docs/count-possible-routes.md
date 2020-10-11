# count-possible-routes

the number of possible delivery route between two towns

## Example A

`POST /count-possible-routes`

maxStops = 4, sameRouteEnable = false

### Request

```json
{
  "graph": [
    "AB1",
    "AC4",
    "AD10",
    "BE3",
    "CD4",
    "CF2",
    "DE1",
    "EB3",
    "EA2",
    "FD1",
    "DZ1000"
  ],
  "source": "E",
  "destination": "D",
  "sameRouteEnable": false,
  "maxStops": 4
}
```

### Response

```json
{
  "count": 4
}
```

## Example B

`POST /count-possible-routes`

sameRouteEnable = false, no limit stops & distance

### Request

```json
{
  "graph": [
    "AB1",
    "AC4",
    "AD10",
    "BE3",
    "CD4",
    "CF2",
    "DE1",
    "EB3",
    "EA2",
    "FD1",
    "DZ1000"
  ],
  "source": "E",
  "destination": "E",
  "sameRouteEnable": false
}
```

### Response

```json
{
  "count": 5
}
```

## Example Bonus

`POST /count-possible-routes`

sameRouteEnable = true, lessThanDistance = 20

### Request

```json
{
  "graph": [
    "AB1",
    "AC4",
    "AD10",
    "BE3",
    "CD4",
    "CF2",
    "DE1",
    "EB3",
    "EA2",
    "FD1",
    "DZ1000"
  ],
  "source": "E",
  "destination": "E",
  "lessThanDistance": 20,
  "sameRouteEnable": true
}
```

### Response

```json
{
  "count": 29
}
```
