# problem-delivery-service

[![Build status][travis-svg]][travis]
[![Code coverage][codecov-svg]][codecov]

[travis]: https://travis-ci.org/zugarzeeker/problem-delivery-service
[travis-svg]: https://img.shields.io/travis/zugarzeeker/problem-delivery-service.svg?style=flat
[npm]: https://www.npmjs.com/package/problem-delivery-service
[npm-svg]: https://img.shields.io/npm/v/problem-delivery-service.svg?style=flat
[codecov]: https://codecov.io/gh/zugarzeeker/problem-delivery-service/src/master/README.md
[codecov-svg]: https://img.shields.io/codecov/c/github/zugarzeeker/problem-delivery-service.svg

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

how to run tests

### Unit Test

```
$ npm run unit-test
```

### System Test

have to run `npm start` to start service before run `npm run system-test`

```
$ npm run system-test
```

## API Docs

[postman-collection](./problem-delivery-service.postman_collection.json) for
manual testing (RPC style)

- [example-sum](./docs/example-sum.md)
- [delivery-cost](./docs/delivery-cost.md)
- [count-possible-routes](./docs/count-possible-routes.md)
- [cheapest-delivery-cost](./docs/cheapest-delivery-cost.md)

## Scenario Example

```
[start service]
--> [delivery-cost] or [cheapest-delivery-cost] or [count-possible-routes]
```
