# Sprint Challenge Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **how to build web services based on the REST (REpresentational State Transfer) architectural style**. During this sprint, you studied **Node.js and Express, server side routing, how to write Express middleware and how to deploy an API to Heroku**.

In your challenge this week, you will demonstrate your mastery of these skills by designing and creating a web API to manage the following resources: `Projects` and `Actions`.

This is an individual assessment. All work must be your own. All projects will be submitted to Codegrade for automated review. You will also be given feedback by code reviewers the Monday after challenge submissions. For more information on the review process [click here](https://www.notion.so/bloomtech/How-to-View-Feedback-in-CodeGrade-c5147cee220c4044a25de28bcb6bb54a).

You are not allowed to collaborate during the sprint challenge.

## Introduction

In meeting the minimum viable product (MVP) specifications listed below, your project should provide an API that has Create, Read, Update and Delete (CRUD) functionality for both `projects` and `actions`.

## Instructions

### Task 1: Project Set Up

- [ ] Run `npm install` to install your dependencies.
- [ ] Run tests locally executing `npm test`.
- [ ] Reset the database to its original state executing `npm run resetdb`.

### Task 2: Project Requirements (MVP)

Your finished project must include all of the following requirements:

#### NPM Scripts

A _"test"_ script already exists you can use to run tests against your code.
A _"resetdb"_ script exists that allows you to reset the database to its original state.

- [ ] Write an _npm script_ named _"start"_ that uses `node` to run the API server.
- [ ] Write an _npm script_ named _"server"_ that uses `nodemon` to run the API server.
- [ ] Install _nodemon_ as a development dependency that would not be used in production.

#### Environment Variables

- [ ] Bring the port number from the `process.env` variable, falling back to `9000` if `process.env.PORT` is undefined **!!!**

#### Endpoints

Inside `api/projects/projects-router.js` build the following endpoints:

- [ ] `[GET] /api/projects`
  - Returns an array of projects as the body of the response.
  - If there are no projects it responds with an empty array.
- [ ] `[GET] /api/projects/:id`
  - Returns a project with the given `id` as the body of the response.
  - If there is no project with the given `id` it responds with a status code 404.
- [ ] `[POST] /api/projects`
  - Returns the newly created project as the body of the response.
  - If the request body is missing any of the required fields it responds with a status code 400.
- [ ] `[PUT] /api/projects/:id`
  - Returns the updated project as the body of the response.
  - If there is no project with the given `id` it responds with a status code 404.
  - If the request body is missing any of the required fields it responds with a status code 400.
- [ ] `[DELETE] /api/projects/:id`
  - Returns no response body.
  - If there is no project with the given `id` it responds with a status code 404.
- [ ] `[GET] /api/projects/:id/actions`
  - Returns an array of actions (could be empty) belonging to a project with the given `id`.
  - If there is no project with the given `id` it responds with a status code 404.

Inside `api/actions/actions-router.js` build endpoints for performing CRUD operations on _actions_:

- [ ] `[GET] /api/actions`
  - Returns an array of actions (or an empty array) as the body of the response.
- [ ] `[GET] /api/actions/:id`
  - Returns an action with the given `id` as the body of the response.
  - If there is no action with the given `id` it responds with a status code 404.
- [ ] `[POST] /api/actions`
  - Returns the newly created action as the body of the response.
  - If the request body is missing any of the required fields it responds with a status code 400.
  - When adding an action make sure the `project_id` provided belongs to an existing `project`.
- [ ] `[PUT] /api/actions/:id`
  - Returns the updated action as the body of the response.
  - If there is no action with the given `id` it responds with a status code 404.
  - If the request body is missing any of the required fields it responds with a status code 400.
- [ ] `[DELETE] /api/actions/:id`
  - Returns no response body.
  - If there is no action with the given `id` it responds with a status code 404.

#### Middleware functions

- [ ] Write at least two middleware functions for this API, and consume them in the proper places of your code.

### Database Schemas

The description of the structure and extra information about each _resource_ stored in the included database (`./data/database.db3`) is listed below.

#### Projects

| Field       | Data Type | Metadata                                                                    |
| ----------- | --------- | --------------------------------------------------------------------------- |
| id          | number    | do not provide it when creating projects, the database will generate it     |
| name        | string    | required                                                                    |
| description | string    | required                                                                    |
| completed   | boolean   | not required, defaults to false when creating projects                      |

#### Actions

| Field       | Data Type | Metadata                                                                                         |
| ----------- | --------- | ------------------------------------------------------------------------------------------------ |
| id          | number    | do not provide it when creating actions, the database will generate it                           |
| project_id  | number    | required, must be the id of an existing project                                                  |
| description | string    | required, up to 128 characters long                                                              |
| notes       | string    | required, no size limit. Used to record additional notes or requirements to complete the action  |
| completed   | boolean   | not required, defaults to false when creating actions                                            |

### Database Persistence Helpers

The project includes models you can use to manage the persistence of _project_ and _action_ data. These files are `api/projects/projects-model.js` and `api/actions/actions-model.js`. Both files publish the following api, which you can use to store, modify and retrieve each resource:

**All these helper methods return a promise. Remember to use .then().catch() or async/await.**

- `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
- `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
- `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
- `remove()`: the remove method accepts an `id` as its first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projects-model.js` includes an extra method called `getProjectActions()` that takes a _project id_ as its only argument and returns a list of all the _actions_ for the _project_.

We have provided test data for all the resources.

**Important Notes:**

- Do not make changes to your `package.json` except to add **additional** dependencies and scripts. Do not update existing packages.
- Your app must be able to run in Node v.12. Do not use newer features of Node (e.g.: optional chaining and nullish coalescing NOT supported).
- Use an HTTP client like `HTTPie`, `Postman` or `Insomnia` to manually test the API's endpoints.
- Use Express Routers to organize your endpoints.
- Even though you are only required to write two middleware functions, it is advised that you leverage middlewares as much as possible.
- You are welcome to create additional files, but **do not move or rename existing files** or folders.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing including spell-checking and grammar-checking on your work.

## Submission format

- [ ] Submit via Codegrade by pushing commits to your `main` branch.
- [ ] Check Codegrade before the deadline to compare its results against your local tests.
- [ ] Check Codegrade on the days following the Sprint Challenge for reviewer feedback.
- [ ] New commits will be evaluated by Codegrade if pushed _before_ the sprint challenge deadline.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics. You might prepare by writing down your own answers before hand.

1. The core features of Node.js and Express and why they are useful.

Node.js is an open-source, cross-platform runtime environment that allows developers to create all kinds of server-side tools and applications in JavaScript. Node was designed to optimize throughput and scalability in web applications and it uses Javascript as a coding language making it easier for developers to use. Node also allows access to NPM which has hundreds of reusable packages to help automate the build toolchain.

Express provides methods to specify what function is called for a particular HTTP verb (GET, POST, SET, etc.) and URL pattern ("Route"), and methods to specify what template ("view") engine is used, where template files are located, and what template to use to render a response. 

1. Understand and explain the use of Middleware.

Middleware is software that provides common services and capabilities to applications outside of what’s offered by the operating system. Data management, application services, messaging, authentication, and API management are all commonly handled by middleware.

Middleware helps developers build applications more efficiently. It acts like the connective tissue between applications, data, and users.

1. The basic principles of the REST architectural style.

- Uniform interface: a developer must decide the APIs interface for resources in the system

- Client–server: Client applications and server applications must be able to evolve separately without any dependency on each other. 

- Stateless: Make all client-server interactions stateless. The server will not store anything about the latest HTTP request the client made

- Cacheable: Caching brings performance improvement for the client-side and better scope for scalability for a server because the load has been reduced.

- Layered system: A layered system architecture is where you deploy the APIs on server A, and store data on server B and authenticate requests in Server C.

- Code on demand: you are free to return executable code to support a part of your application, e.g., clients may call your API to get a UI widget rendering code. 

1. Understand and explain the use of Express Routers.

Express router is a class which helps us to create router handlers. A router handler is not just providing routing to the app but also the ability to extend this routing to handle validation, handle 404 or other errors etc.

1. Describe tooling used to manually test the correctness of an API.

To test an API, you can use Postman or HTTPie to check how the data is affected using CRUD operations. It is helpful when trying to test whether or not the code being implemented is affecting the API as the developer wishes it to be. It also allows access to the API to ensure the correct data is being passed through.
