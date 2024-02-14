import { EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Column } from '../../../lib/data-set/column';
import * as i0 from "@angular/core";
export declare class DefaultFilter implements Filter, OnDestroy {
    delay: number;
    changesSubscription: Subscription;
    query: string;
    inputClass: string;
    column: Column;
    filter: EventEmitter<string>;
    ngOnDestroy(): void;
    setFilter(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DefaultFilter, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DefaultFilter, "ng-component", never, { "query": { "alias": "query"; "required": false; }; "inputClass": { "alias": "inputClass"; "required": false; }; "column": { "alias": "column"; "required": false; }; }, { "filter": "filter"; }, never, never, false, never>;
}
export interface Filter {
    delay?: number;
    changesSubscription?: Subscription;
    query: string;
    inputClass: string;
    column: Column;
    filter: EventEmitter<string>;
}
