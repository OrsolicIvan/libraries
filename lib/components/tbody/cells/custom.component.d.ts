import { EventEmitter } from '@angular/core';
import { Row } from '../../../lib/data-set/row';
import { Grid } from '../../../lib/grid';
import * as i0 from "@angular/core";
export declare class TbodyCustomComponent {
    grid: Grid;
    row: Row;
    source: any;
    custom: EventEmitter<any>;
    onCustom(action: any, event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TbodyCustomComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TbodyCustomComponent, "ng2-st-tbody-custom", never, { "grid": { "alias": "grid"; "required": false; }; "row": { "alias": "row"; "required": false; }; "source": { "alias": "source"; "required": false; }; }, { "custom": "custom"; }, never, never, false, never>;
}
