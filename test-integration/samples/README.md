# Sample application generation

To generate test applications, either automatically by the CI or locally on the developer machine, a number of pre-defined configurations have been prepared.

## Application configurations

Those are described in `.yo-rc.json` files which is the descriptor file created by Yeoman to keep track of the choices selected while generating an application.

- app-sample-dev: left empty for local testing, launching the generator with the VSCode debugger will generate an app in this folder
- jdl-default
- react-default
- react-gradle-cassandra-session-redis
- react-gradle-couchbase-caffeine
- react-gradle-h2mem-memcached
- react-gradle-psql-es-noi18n-mapsid
- react-maven-cassandra-session-redis
- react-maven-couchbase-caffeine
- react-maven-h2mem-memcached
- react-maven-psql-es-noi18n-mapsid
- react-noi18n-es-ws-gradle-session
- uaa

## Entity configurations

We also have a number of `Entity.json` files for testing different entity configurations.
