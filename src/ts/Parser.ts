import {
    DataCaptureComponent,
    PrivateDataCaptureComponent,
} from 'scandit-datacapture-frameworks-core';
import { ParsedData } from './ParsedData';
import { ParserDataFormat } from './ParserDataFormat';
import { DefaultSerializeable, ignoreFromSerialization, nameForSerialization } from 'scandit-datacapture-frameworks-core';

import { ParserProxy } from './Capacitor/ParserProxy';

export interface PrivateParser extends PrivateDataCaptureComponent {
    dataFormat: ParserDataFormat;
    options: { [key: string]: any };
    proxy: ParserProxy;
    isInitialized: boolean;
    waitingForInitialization: [() => void];
    waitForInitialization: Promise<void>;
}

export class Parser extends DefaultSerializeable implements DataCaptureComponent {

    private type = 'parser';
    private dataFormat: ParserDataFormat;
    private options = {} as { [key: string]: any };

    @nameForSerialization('id')
    private _id: string = `${Date.now()}`;
    public get id(): string {
        return this._id;
    }

    @ignoreFromSerialization
    private isInitialized = false;
    @ignoreFromSerialization
    private waitingForInitialization = [] as any as [() => void];

    @ignoreFromSerialization
    private _proxy: ParserProxy;
    private get proxy(): ParserProxy {
        if (!this._proxy) {
            this._proxy = ParserProxy.forParser(this);
        }
        return this._proxy;
    }

    public static create(dataFormat: ParserDataFormat): Promise<Parser> {
        const parser = new Parser();
        parser.dataFormat = dataFormat;
        return parser.proxy.createUpdateNativeInstance()
            .then(() => {
                parser.isInitialized = true;
                parser.waitingForInitialization.forEach(f => f());
                return parser;
            });
    }

    private constructor() {
        super();
    }

    public setOptions(options: { [key: string]: any }): Promise<void> {
        this.options = options;
        return this.proxy.createUpdateNativeInstance();
    }

    public parseString(data: string): Promise<ParsedData> {
        return this.proxy.parseString(data);
    }

    public parseRawData(data: string): Promise<ParsedData> {
        return this.proxy.parseRawData(data);
    }

    public dispose(): void {
        this.proxy.disposeParser();
    }

    private waitForInitialization(): Promise<void> {
        if (this.isInitialized) {
            return Promise.resolve();
        } else {
            return new Promise(resolve => this.waitingForInitialization.push(resolve));
        }
    }
}
