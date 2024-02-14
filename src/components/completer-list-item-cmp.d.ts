import { OnInit } from "@angular/core";
import * as i0 from "@angular/core";
export interface MatchPart {
    isMatch: boolean;
    text: string;
}
export declare class CompleterListItemCmp implements OnInit {
    text: string;
    searchStr: string;
    matchClass: string;
    type: string;
    parts: MatchPart[];
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CompleterListItemCmp, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CompleterListItemCmp, "completer-list-item", never, { "text": { "alias": "text"; "required": false; }; "searchStr": { "alias": "searchStr"; "required": false; }; "matchClass": { "alias": "matchClass"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, {}, never, never, false, never>;
}
