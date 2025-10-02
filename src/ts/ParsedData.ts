import { ParsedField, ParsedFieldJSON, PrivateParsedField } from './ParsedField';

type ParsedDataJSON = [ParsedFieldJSON];

export interface PrivateParsedData {
    fromJSON(json: ParsedDataJSON): ParsedData;
}


export class ParsedData {
    private _jsonString: string;
    public get jsonString(): string {
        return this._jsonString;
    }

    private _fields: ParsedField[];
    public get fields(): ParsedField[] {
        return this._fields;
    }

    private _fieldsWithIssues: ParsedField[];
    public get fieldsWithIssues(): ParsedField[] {
        return this._fieldsWithIssues;
    }

    private _fieldsByName: { [key: string]: ParsedField };
    public get fieldsByName(): { [key: string]: ParsedField } {
        return this._fieldsByName;
    }

    private static fromJSON(json: ParsedDataJSON): ParsedData {
        const data = new ParsedData();

        data._jsonString = JSON.stringify(json);
        data._fields = json.map((ParsedField as any as PrivateParsedField).fromJSON);
        data._fieldsByName = data._fields.reduce((fieldsByName: { [key: string]: ParsedField }, field) => {
            fieldsByName[field.name] = field;
            return fieldsByName;
        }, {});
        data._fieldsWithIssues = data._fields.filter(e => e.warnings.length > 0);

        return data;
    }
}
