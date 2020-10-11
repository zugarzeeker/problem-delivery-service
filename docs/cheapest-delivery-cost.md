# cheapest-delivery-cost

the cost of cheapest delivery route between two towns

## Example

`POST /cheapest-delivery-cost`

### Request

```json
{
  "graphtext": "AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1, DZ1000",
  "source": "E",
  "destination": "D"
}
```

### Response

```json
{
  "cost": 9
}
```
