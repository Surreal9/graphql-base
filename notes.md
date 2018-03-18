# Architecture

There are 3 main layers to the system:

* Application

* Domain

* Gateways

## Application layer

The application layer lives in `src/app`. The application layer is responsible for the binding and configuration of available functionality between the internal business logic within the domain layer. It provides an entry point to bind external triggers (ie http, or CLI, or etc). There is a `app/container` directory which contains the domain dependency configuration, and separate directories to represent different applications (ie `app/express-graphql`)

## Domain layer

This is the core business logic. It lives in `src/core`, containing `entities` and `interactors`. Entities contain application-independent logic (ie validation), and interactors implement use cases or discrete packaging of functionality exposed through the application layer.

## Gateway layer

The gateway layer is responsible for communication with external data sources, ie infrastructure or persistence. This is where implementation lives for talking to databases, 3rd party APIs, etc. The Gateway layer is not aware of any other layer.

## Boundaries

Each layer communicates to the one below it using the interfaces defined in `/boundary`. This directory exclusively contains interfaces and details the interactions each layer uses to communicate data.
