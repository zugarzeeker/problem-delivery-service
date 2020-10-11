# eko-delivery-service

Provide their customers with information about delivery route.

Service will compute as follows.

- the delivery cost of a certain route
- the number of possible delivery route between two towns
- the cost of cheapest delivery route between two towns

## Getting started

1. Install Node.js (version >= 12)

2. Install dependencies

```
$ yarn # or npm install
```

3. Start Service

```
$ yarn start # or npm start
```

## Automated Tests

```
$ npm run unit-test
$ npm run system-test # run `npm start` to start service before run `npm run system-test`
```

## API Docs

[postman-collection](./eko-delivery-service.postman_collection.json) for manual
testing

- example-sum
- delivery-cost
- cheapest-delivery-cost
- count-possible-routes

## Scenario Example

```
[start service]
--> [delivery-cost] or [cheapest-delivery-cost] or [count-possible-routes]
```
