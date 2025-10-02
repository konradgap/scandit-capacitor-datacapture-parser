import { ParserIssue, ParserIssueJSON, PrivateParserIssue } from './ParserIssue';

export interface ParsedFieldJSON {
  name: string;
  parsed: any;
  rawString: string;
  warnings?: ParserIssueJSON[];
}

export interface PrivateParsedField {
  fromJSON(json: ParsedFieldJSON): ParsedField;
}

export class ParsedField {
  private _name: string;
  public get name(): string {
    return this._name;
  }

  private _parsed: any;
  public get parsed(): any {
    return this._parsed;
  }

  private _rawString: string;
  public get rawString(): string {
    return this._rawString;
  }

  private _warnings: ParserIssue[];
  public get warnings(): ParserIssue[] {
    return this._warnings;
  }

  private static fromJSON(json: ParsedFieldJSON): ParsedField {
    const field = new ParsedField();

    field._name = json.name;
    field._parsed = json.parsed;
    field._rawString = json.rawString;
    field._warnings = json.warnings?.map(e => (ParserIssue as any as PrivateParserIssue).fromJSON(e)) || [];

    return field;
  }
}
