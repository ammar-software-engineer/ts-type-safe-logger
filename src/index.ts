enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  CRITICAL = 4,
}

type LogMeta = Record<string, any>;

interface LoggerOptions {
  level: LogLevel;
  prefix?: string;
  enableColors?: boolean;
}

class Logger {
  private level: LogLevel;
  private prefix: string;
  private enableColors: boolean;

  constructor(options?: Partial<LoggerOptions>) {
    this.level = options?.level ?? LogLevel.INFO;
    this.prefix = options?.prefix ?? 'APP';
    this.enableColors = options?.enableColors ?? true;
  }

  private formatMessage(level: LogLevel, message: string, meta?: LogMeta): string {
    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];
    const color = this.enableColors ? this.getColorForLevel(level) : '';
    const resetColor = this.enableColors ? '\x1b[0m' : '';

    let formattedMessage = `${timestamp} [${color}${this.prefix}:${levelName}${resetColor}] ${message}`;

    if (meta) {
      formattedMessage += ` - Meta: ${JSON.stringify(meta)}`;
    }
    return formattedMessage;
  }

  private getColorForLevel(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG: return '\x1b[36m'; // Cyan
      case LogLevel.INFO: return '\x1b[32m';  // Green
      case LogLevel.WARN: return '\x1b[33m';  // Yellow
      case LogLevel.ERROR: return '\x1b[31m'; // Red
      case LogLevel.CRITICAL: return '\x1b[41m\x1b[37m'; // White on Red background
      default: return '';
    }
  }

  debug(message: string, meta?: LogMeta): void {
    if (this.level <= LogLevel.DEBUG) {
      console.log(this.formatMessage(LogLevel.DEBUG, message, meta));
    }
  }

  info(message: string, meta?: LogMeta): void {
    if (this.level <= LogLevel.INFO) {
      console.info(this.formatMessage(LogLevel.INFO, message, meta));
    }
  }

  warn(message: string, meta?: LogMeta): void {
    if (this.level <= LogLevel.WARN) {
      console.warn(this.formatMessage(LogLevel.WARN, message, meta));
    }
  }

  error(message: string, meta?: LogMeta): void {
    if (this.level <= LogLevel.ERROR) {
      console.error(this.formatMessage(LogLevel.ERROR, message, meta));
    }
  }

  critical(message: string, meta?: LogMeta): void {
    if (this.level <= LogLevel.CRITICAL) {
      console.error(this.formatMessage(LogLevel.CRITICAL, message, meta));
    }
  }

  setLevel(level: LogLevel): void {
    this.level = level;
  }
}

// --- Example Usage ---

const defaultLogger = new Logger({ prefix: 'CORE', level: LogLevel.DEBUG });
const serverLogger = new Logger({ prefix: 'SERVER', level: LogLevel.INFO, enableColors: true });
const dbLogger = new Logger({ prefix: 'DATABASE', level: LogLevel.ERROR });

console.log('--- Default Logger (DEBUG level) ---');
defaultLogger.debug('This is a debug message.');
defaultLogger.info('This is an informational message.', { userId: 123 });
defaultLogger.warn('A potential issue detected.');
defaultLogger.error('An error occurred!');
defaultLogger.critical('CRITICAL SYSTEM FAILURE!');

console.log('
--- Server Logger (INFO level) ---');
serverLogger.debug('This debug message should not appear.');
serverLogger.info('Server started on port 3000.', { port: 3000 });
serverLogger.warn('High CPU usage detected.');
serverLogger.error('Failed to connect to external service.');

console.log('
--- Database Logger (ERROR level) ---');
dbLogger.debug('This debug message should not appear.');
dbLogger.info('This info message should not appear.');
dbLogger.warn('This warning message should not appear.');
dbLogger.error('Failed to write to database!', { table: 'users', error: 'constraint violation' });
dbLogger.critical('Database connection lost!');

defaultLogger.setLevel(LogLevel.WARN);
console.log('
--- Default Logger (level set to WARN) ---');
defaultLogger.debug('This debug message should not appear anymore.');
defaultLogger.info('This info message should not appear anymore.');
defaultLogger.warn('Now only warnings and errors will show.');
defaultLogger.error('Another error after level change.');
