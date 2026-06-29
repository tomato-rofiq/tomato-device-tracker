// minimal leveled logger. debug/info are no-ops in production builds.

const noop = () => {};
const dev = import.meta.env.DEV;

export const log = {
  debug: dev ? console.debug.bind(console) : noop,
  info: dev ? console.info.bind(console) : noop,
  warn: console.warn.bind(console),
  error: console.error.bind(console),
};