# `ts-type-safe-logger`

## Description

`ts-type-safe-logger` is a robust and type-safe logging utility for TypeScript applications. It provides a flexible `Logger` class that supports various log levels, custom prefixes, colorful console output, and the ability to attach meta-data to log entries. This library helps developers maintain clear and structured logs, crucial for debugging, monitoring, and understanding application behavior.

## Features

-   **Type-Safe Logging**: Ensures log messages and meta-data are handled with TypeScript's static analysis.
-   **Configurable Log Levels**: Define and control the verbosity of your logs using predefined `LogLevel` enums (DEBUG, INFO, WARN, ERROR, CRITICAL).
-   **Customizable Prefixes**: Add unique prefixes to different logger instances (e.g., `[APP:INFO]`, `[SERVER:ERROR]`) for easy identification of log sources.
-   **Colorized Output**: Optionally enables ANSI escape codes for visually distinct log levels in the console, improving readability.
-   **Meta-Data Support**: Attach arbitrary `Record<string, any>` objects to log entries for richer contextual information.
-   **Runtime Level Adjustment**: Change the logger's minimum active log level dynamically during application execution.

## Installation

To install `ts-type-safe-logger`, use npm or yarn:

```bash
npm install ts-type-safe-logger
# or
yarn add ts-type-safe-logger
```

## Usage

### Log Levels

The `LogLevel` enum defines the severity of log messages:

```typescript
enum LogLevel {
  DEBUG = 0,    // Detailed information, typically only of interest when diagnosing problems.
  INFO = 1,     // Informational messages, highlighting the progress of the application at coarse-grained level.
  WARN = 2,     // Potentially harmful situations.
  ERROR = 3,    // Error events that might still allow the application to continue running.
  CRITICAL = 4, // Critical events that likely lead to application termination.
}
```

### Creating a Logger Instance

You can create a new logger instance with optional configuration:

```typescript
import { Logger, LogLevel } from 'ts-type-safe-logger';

// Default logger (INFO level, prefix 'APP', colors enabled)
const defaultLogger = new Logger();

// Custom logger for server operations (DEBUG level, prefix 'SERVER', colors enabled)
const serverLogger = new Logger({
  prefix: 'SERVER',
  level: LogLevel.DEBUG,
  enableColors: true,
});

// Database logger (ERROR level, prefix 'DATABASE', colors disabled)
const dbLogger = new Logger({
  prefix: 'DATABASE',
  level: LogLevel.ERROR,
  enableColors: false,
});
```

### Logging Messages

Use the provided methods (`debug`, `info`, `warn`, `error`, `critical`) to log messages. You can also include an optional meta-data object.

```typescript
import { Logger, LogLevel } from 'ts-type-safe-logger';

const appLogger = new Logger({ prefix: 'APP', level: LogLevel.DEBUG });

appLogger.debug('Application initialized successfully.', { version: '1.0.0' });
appLogger.info('User logged in.', { userId: 123, username: 'john.doe' });
appLogger.warn('Deprecated API endpoint used.', { endpoint: '/old/api' });
appLogger.error('Failed to process request.', { requestId: 'abc-123', error: 'Network Timeout' });
appLogger.critical('Unrecoverable error, shutting down.', { code: 500, details: 'Out of memory' });
```

### Adjusting Log Level at Runtime

You can change the minimum logging level of a logger instance using the `setLevel` method:

```typescript
import { Logger, LogLevel } from 'ts-type-safe-logger';

const myLogger = new Logger({ level: LogLevel.INFO });
myLogger.info('This info message will appear.');
myLogger.debug('This debug message will NOT appear.');

myLogger.setLevel(LogLevel.DEBUG); // Change level to DEBUG

myLogger.info('This info message will still appear.');
myLogger.debug('Now this debug message WILL appear.');
```

## Logger Options

```typescript
interface LoggerOptions {
  level: LogLevel;       // Minimum log level for this logger instance. Defaults to LogLevel.INFO.
  prefix?: string;        // A string prefix to identify the logger's source. Defaults to 'APP'.
  enableColors?: boolean; // Whether to use ANSI colors in the console output. Defaults to true.
}
```

## Development

To set up the project for development:

1.  Clone the repository:
    ```bash
    git clone https://github.com/YOUR_USERNAME/ts-type-safe-logger.git
    cd ts-type-safe-logger
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Compile the TypeScript code:
    ```bash
    npm run build
    ```

## License

This project is open-source and available under the [MIT License](LICENSE).