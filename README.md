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

## Commands

```
$ npm run test-unit
$ npm run system-test
```

## API Docs

for manual testing

- example-sum
- create-graph
- delivery-cost
- cheapest-delivery-cost
- count-possible-routes
- delete-graph

## Scenario Example 1

```
[run service]
--> [delivery-cost] or [cheapest-delivery-cost] or [count-possible-routes]
```

## Scenario Example 2

```
[run service]
--> [create-graph]
--> [delivery-cost] or [cheapest-delivery-cost] or [count-possible-routes]
--> [delete-graph]
```
