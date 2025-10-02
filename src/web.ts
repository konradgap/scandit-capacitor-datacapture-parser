import { registerPlugin } from '@capacitor/core';
import type { ScanditParserPluginInterface } from './definitions';

export * from './definitions';

import * as ParserExports from './definitions';

export class ScanditParserPluginImplementation implements ScanditParserPluginInterface {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async initialize(): Promise<any> {
    const api = {
      ...ParserExports
    };

    return api;
  }
}

registerPlugin<ScanditParserPluginImplementation>('ScanditParserPlugin', {
  android: () => new ScanditParserPluginImplementation(),
  ios: () => new ScanditParserPluginImplementation(),
  web: () => new ScanditParserPluginImplementation(),
});

// tslint:disable-next-line:variable-name
export const ScanditParserPlugin = new ScanditParserPluginImplementation();
