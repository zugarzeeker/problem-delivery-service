# delivery-cost

the delivery cost of a certain route

## Example

`POST /delivery-cost`

### Request

```json
{
  "graphtext": "AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1",
  "deliveryRoute": ["A", "B", "E"]
}
```

### Response

```json
{
  "cost": 4
}
```
