import { ChangeDetectorRef, OnInit, TemplateRef, ViewContainerRef, NgZone } from "@angular/core";
import { CompleterItem } from "../components/completer-item";
import { CompleterData } from "../services/completer-data";
import { CompleterList, CtrCompleter } from "./ctr-completer";
import * as i0 from "@angular/core";
export declare class CtrListContext {
    results: CompleterItem[] | null;
    searching: boolean;
    searchInitialized: boolean;
    isOpen: boolean;
    constructor(results: CompleterItem[] | null, searching: boolean, searchInitialized: boolean, isOpen: boolean);
}
export declare class CtrList implements OnInit, CompleterList {
    private completer;
    private templateRef;
    private viewContainer;
    private cd;
    private zone;
    ctrListMinSearchLength: number;
    ctrListPause: number;
    ctrListAutoMatch: boolean;
    ctrListAutoHighlight: boolean;
    ctrListDisplaySearching: boolean;
    private _dataService;
    private term;
    private searchTimer;
    private clearTimer;
    private ctx;
    private _initialValue;
    private viewRef;
    constructor(completer: CtrCompleter, templateRef: TemplateRef<CtrListContext>, viewContainer: ViewContainerRef, cd: ChangeDetectorRef, zone: NgZone);
    ngOnInit(): void;
    set dataService(newService: CompleterData);
    set initialValue(value: any);
    search(term: string): void;
    clear(): void;
    open(): void;
    isOpen(open: boolean): void;
    private _clear;
    private searchTimerComplete;
    private refreshTemplate;
    private getBestMatchIndex;
    private dataServiceSubscribe;
    static ɵfac: i0.ɵɵFactoryDeclaration<CtrList, [{ host: true; }, null, null, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CtrList, "[ctrList]", never, { "ctrListMinSearchLength": { "alias": "ctrListMinSearchLength"; "required": false; }; "ctrListPause": { "alias": "ctrListPause"; "required": false; }; "ctrListAutoMatch": { "alias": "ctrListAutoMatch"; "required": false; }; "ctrListAutoHighlight": { "alias": "ctrListAutoHighlight"; "required": false; }; "ctrListDisplaySearching": { "alias": "ctrListDisplaySearching"; "required": false; }; "dataService": { "alias": "ctrList"; "required": false; }; "initialValue": { "alias": "ctrListInitialValue"; "required": false; }; }, {}, never, never, false, never>;
}
