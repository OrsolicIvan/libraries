import { ElementRef, Renderer2, OnDestroy } from "@angular/core";
import { CompleterItem } from "../components/completer-item";
import { CtrDropdown, CtrRowElement } from "./ctr-dropdown";
import * as i0 from "@angular/core";
export declare class CtrRow implements CtrRowElement, OnDestroy {
    private el;
    private renderer;
    private dropdown;
    private selected;
    private _rowIndex;
    private _item;
    constructor(el: ElementRef, renderer: Renderer2, dropdown: CtrDropdown);
    ngOnDestroy(): void;
    set ctrRow(index: number);
    set dataItem(item: CompleterItem);
    onClick(event: any): void;
    onMouseEnter(event: any): void;
    onMouseDown(event: any): void;
    setHighlighted(selected: boolean): void;
    getNativeElement(): any;
    getDataItem(): CompleterItem | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<CtrRow, [null, null, { host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CtrRow, "[ctrRow]", never, { "ctrRow": { "alias": "ctrRow"; "required": false; }; "dataItem": { "alias": "dataItem"; "required": false; }; }, {}, never, never, false, never>;
}
