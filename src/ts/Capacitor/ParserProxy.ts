import { NativeCallResult } from 'scandit-datacapture-frameworks-core';
import { ParsedData, PrivateParsedData } from '../ParsedData';
import { Capacitor, PluginMethod } from './Capacitor';

declare type Parser = any; // To avoid a circular dependency. Parser is only used here as a type

export class ParserProxy {
    private static capacitorExec = Capacitor.exec;
    private parser: Parser;

    public static forParser(parser: Parser): ParserProxy {
        const proxy = new ParserProxy();
        proxy.parser = parser;
        return proxy;
    }

    public parseString(data: string): Promise<ParsedData> {
        return new Promise((resolve, reject) =>
            this.parser.waitForInitialization().then(() => ParserProxy.capacitorExec(
                (payload: NativeCallResult) =>
                    resolve((ParsedData as any as PrivateParsedData).fromJSON(JSON.parse(payload.data))),
                reject,
                PluginMethod.ParseString,
                {
                    id: this.parser.id,
                    data,
                } as any,
            ),
            ));
    }

    public parseRawData(data: string): Promise<ParsedData> {
        return new Promise((resolve, reject) =>
            this.parser.waitForInitialization().then(() => ParserProxy.capacitorExec(
                (payload: NativeCallResult) =>
                    resolve((ParsedData as any as PrivateParsedData).fromJSON(JSON.parse(payload.data))),
                reject,
                PluginMethod.ParseRawData,
                {
                    id: this.parser.id,
                    data,
                } as any,
            ),
            ));
    }

    public createUpdateNativeInstance(): Promise<void> {
        return new Promise((resolve, reject) =>
            ParserProxy.capacitorExec(
                resolve,
                reject,
                PluginMethod.CreateUpdateNativeInstance,
                {data: JSON.stringify(this.parser.toJSON())},
            ));
    }


    public disposeParser(): Promise<void> {
        return new Promise((resolve, reject) =>
            ParserProxy.capacitorExec(
                resolve,
                reject,
                PluginMethod.DisposeParser,
                {data: this.parser.id },
            ));
    }
}
