import { ParserIssueAdditionalInfoKey } from './ParserIssueAdditionalInfoKey';
import { ParserIssueCode } from './ParserIssueCode';


export interface ParserIssueJSON {
    code: ParserIssueCode;
    message: string;
    additionalInfo: Record<ParserIssueAdditionalInfoKey, string>
}

export interface PrivateParserIssue {
    fromJSON(json: ParserIssueJSON): ParserIssue;
}

export class ParserIssue {
    private _code: ParserIssueCode;
    public get code(): ParserIssueCode {
        return this._code;
    }

    private _message: string;
    public get message(): string {
        return this._message;
    }

    private _additionalInfo: Record<ParserIssueAdditionalInfoKey, string>
    public get additionalInfo(): Record<ParserIssueAdditionalInfoKey, string> {
        return this._additionalInfo;
    }

    private static fromJSON(json: ParserIssueJSON): ParserIssue {
      const issue = new ParserIssue();

        issue._code = json.code;
        issue._message = json.message;
        issue._additionalInfo = json.additionalInfo;

        return issue;
    }
}