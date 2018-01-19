/**
 * Prevent a module to be loaded by other modules except the app module.
 *
 * @export
 * @param {*} parentModule
 * @param {string} moduleName
 */
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
