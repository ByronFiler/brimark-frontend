# brimark-frontend

1. Download nodeJS [v14.15.3](https://nodejs.org/en/blog/release/v14.15.3)   

2. Download the parcel-bundler:
> npm install -g parcel-bundler@1.12.4   

3. Install Typescript:
> npm install -g typescript@4.1.5 

4. To install all the packages from the package.json:
> npm install

5. To fix any severity vulnerabilities:
> npm audit fix

To run the project locally use the command. *__Note__:  this will run the tests first by default and then run the server!*
> npm run dev

To run the tests:
> npm test

If you want to build the project:
> npm run build

To build the documentation:
> npm run ts-docs

To build the test coverage document:
> npm run ts-coverage

APIs Used:
- [Mocha](https://mochajs.org/) Javascript Testing Library
- [Chai](https://www.chaijs.com/) BDD / TDD assertion library
- [TypeDoc](https://typedoc.org/) Documentation generator for TypeScript projects.
- [ParcelJS](https://parceljs.org/) Web application bundler
- [Type-Coverage](https://github.com/plantain-00/type-coverage) A CLI tool to check type coverage for typescript code
- [TypeScript-Coverage-Report](https://www.npmjs.com/package/typescript-coverage-report) command line tool for generating TypeScript coverage reports