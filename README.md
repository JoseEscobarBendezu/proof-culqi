# proof-culqi

## Table of contents

- [Requirements](#Requirements)
- [Commands](#Commands)
- [Files](#Files)
- [Test](#Test)

## Requirements

- Node 16.x.x
- AWS serverless

## Commands

Scripts for proyect, for more details of script run command `npm run`

```
npm run build  // for transpile typescript code to javascript "tsc"
npm run test  // for test coverage code "jest -c ./jest.unit.json"
```

## Files

```text
dist/
postman/
src/
├── api/
│   ├── card.ts
│   └── token.ts
├── interfaces/
│   └── crediCard.ts
├── test/
│   ├── card.spec.ts
│   ├── token.spec.ts
│   └── validator.spec.ts
└── utils/
    └── validator.ts
serveless.yml
jest.unit.json
tsconfig.json
```

- dist/ is file for transpile code to javascript
- postman/ is examples for request on postman.json format
- src/ is root file for this project
- serverless.yml document for configuration on serverless
- tsconfig.json is config for transpile code from typescript

## Test

For testing and examples, find postman File and import json file on postam with import menu
