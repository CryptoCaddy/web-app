/* eslint-disable no-console */

export const Logger = {

  error(module: string, message: any) {
    console.error(module, message);
  },

  warn(module: string, message: any) {
    console.warn(module, message);
  },

};
