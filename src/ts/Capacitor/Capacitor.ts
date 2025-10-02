import { capacitorExec } from 'scandit-capacitor-datacapture-core';

// tslint:disable-next-line:variable-name
export const Capacitor = {
  pluginName: 'ScanditParserNative',
  exec: (
    success: Function | null,
    error: Function | null,
    functionName: string,
    args: any,
  ) => capacitorExec(success, error, Capacitor.pluginName, functionName, args),
};

export enum PluginMethod {
  ParseString = 'parseString',
  ParseRawData = 'parseRawData',
  CreateUpdateNativeInstance = 'createUpdateNativeInstance',
  DisposeParser = 'disposeParser',
}
