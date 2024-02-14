import { Component } from '@angular/core';
import { EditCellDefault } from './edit-cell-default';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../cell-editors/checkbox-editor.component";
import * as i3 from "../cell-editors/completer-editor.component";
import * as i4 from "../cell-editors/input-editor.component";
import * as i5 from "../cell-editors/select-editor.component";
import * as i6 from "../cell-editors/textarea-editor.component";
function DefaultEditComponent_select_editor_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "select-editor", 5);
    i0.ɵɵlistener("onClick", function DefaultEditComponent_select_editor_1_Template_select_editor_onClick_0_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.onClick($event)); })("onEdited", function DefaultEditComponent_select_editor_1_Template_select_editor_onEdited_0_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.onEdited($event)); })("onStopEditing", function DefaultEditComponent_select_editor_1_Template_select_editor_onStopEditing_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r8 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r8.onStopEditing()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("cell", ctx_r0.cell)("inputClass", ctx_r0.inputClass);
} }
function DefaultEditComponent_textarea_editor_2_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "textarea-editor", 5);
    i0.ɵɵlistener("onClick", function DefaultEditComponent_textarea_editor_2_Template_textarea_editor_onClick_0_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.onClick($event)); })("onEdited", function DefaultEditComponent_textarea_editor_2_Template_textarea_editor_onEdited_0_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.onEdited($event)); })("onStopEditing", function DefaultEditComponent_textarea_editor_2_Template_textarea_editor_onStopEditing_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r12 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r12.onStopEditing()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("cell", ctx_r1.cell)("inputClass", ctx_r1.inputClass);
} }
function DefaultEditComponent_checkbox_editor_3_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "checkbox-editor", 6);
    i0.ɵɵlistener("onClick", function DefaultEditComponent_checkbox_editor_3_Template_checkbox_editor_onClick_0_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r13 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r13.onClick($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("cell", ctx_r2.cell)("inputClass", ctx_r2.inputClass);
} }
function DefaultEditComponent_completer_editor_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "completer-editor", 7);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("cell", ctx_r3.cell);
} }
function DefaultEditComponent_input_editor_5_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input-editor", 5);
    i0.ɵɵlistener("onClick", function DefaultEditComponent_input_editor_5_Template_input_editor_onClick_0_listener($event) { i0.ɵɵrestoreView(_r16); const ctx_r15 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r15.onClick($event)); })("onEdited", function DefaultEditComponent_input_editor_5_Template_input_editor_onEdited_0_listener($event) { i0.ɵɵrestoreView(_r16); const ctx_r17 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r17.onEdited($event)); })("onStopEditing", function DefaultEditComponent_input_editor_5_Template_input_editor_onStopEditing_0_listener() { i0.ɵɵrestoreView(_r16); const ctx_r18 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r18.onStopEditing()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("cell", ctx_r4.cell)("inputClass", ctx_r4.inputClass);
} }
export class DefaultEditComponent extends EditCellDefault {
    constructor() {
        super();
    }
    getEditorType() {
        return this.cell.getColumn().editor && this.cell.getColumn().editor.type;
    }
    static { this.ɵfac = function DefaultEditComponent_Factory(t) { return new (t || DefaultEditComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DefaultEditComponent, selectors: [["table-cell-default-editor"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 6, vars: 5, consts: [[3, "ngSwitch"], [3, "cell", "inputClass", "onClick", "onEdited", "onStopEditing", 4, "ngSwitchCase"], [3, "cell", "inputClass", "onClick", 4, "ngSwitchCase"], [3, "cell", 4, "ngSwitchCase"], [3, "cell", "inputClass", "onClick", "onEdited", "onStopEditing", 4, "ngSwitchDefault"], [3, "cell", "inputClass", "onClick", "onEdited", "onStopEditing"], [3, "cell", "inputClass", "onClick"], [3, "cell"]], template: function DefaultEditComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, DefaultEditComponent_select_editor_1_Template, 1, 2, "select-editor", 1);
            i0.ɵɵtemplate(2, DefaultEditComponent_textarea_editor_2_Template, 1, 2, "textarea-editor", 1);
            i0.ɵɵtemplate(3, DefaultEditComponent_checkbox_editor_3_Template, 1, 2, "checkbox-editor", 2);
            i0.ɵɵtemplate(4, DefaultEditComponent_completer_editor_4_Template, 1, 1, "completer-editor", 3);
            i0.ɵɵtemplate(5, DefaultEditComponent_input_editor_5_Template, 1, 2, "input-editor", 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("ngSwitch", ctx.getEditorType());
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngSwitchCase", "list");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngSwitchCase", "textarea");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngSwitchCase", "checkbox");
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngSwitchCase", "completer");
        } }, dependencies: [i1.NgSwitch, i1.NgSwitchCase, i1.NgSwitchDefault, i2.CheckboxEditorComponent, i3.CompleterEditorComponent, i4.InputEditorComponent, i5.SelectEditorComponent, i6.TextareaEditorComponent], encapsulation: 2 }); }
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DefaultEditComponent, [{
        type: Component,
        args: [{ selector: 'table-cell-default-editor', template: "<div [ngSwitch]=\"getEditorType()\">\r\n    <select-editor *ngSwitchCase=\"'list'\"\r\n                   [cell]=\"cell\"\r\n                   [inputClass]=\"inputClass\"\r\n                   (onClick)=\"onClick($event)\"\r\n                   (onEdited)=\"onEdited($event)\"\r\n                   (onStopEditing)=\"onStopEditing()\">\r\n    </select-editor>\r\n\r\n    <textarea-editor *ngSwitchCase=\"'textarea'\"\r\n                     [cell]=\"cell\"\r\n                     [inputClass]=\"inputClass\"\r\n                     (onClick)=\"onClick($event)\"\r\n                     (onEdited)=\"onEdited($event)\"\r\n                     (onStopEditing)=\"onStopEditing()\">\r\n    </textarea-editor>\r\n\r\n    <checkbox-editor *ngSwitchCase=\"'checkbox'\"\r\n                     [cell]=\"cell\"\r\n                     [inputClass]=\"inputClass\"\r\n                     (onClick)=\"onClick($event)\">\r\n    </checkbox-editor>\r\n\r\n    <completer-editor *ngSwitchCase=\"'completer'\"\r\n                      [cell]=\"cell\">\r\n    </completer-editor>\r\n\r\n    <input-editor *ngSwitchDefault\r\n                  [cell]=\"cell\"\r\n                  [inputClass]=\"inputClass\"\r\n                  (onClick)=\"onClick($event)\"\r\n                  (onEdited)=\"onEdited($event)\"\r\n                  (onStopEditing)=\"onStopEditing()\">\r\n    </input-editor>\r\n</div>" }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1lZGl0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nMi1zbWFydC10YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvY2VsbC9jZWxsLWVkaXQtbW9kZS9kZWZhdWx0LWVkaXQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmcyLXNtYXJ0LXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy9jZWxsL2NlbGwtZWRpdC1tb2RlL2RlZmF1bHQtZWRpdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Ozs7OztJQ0RsRCx3Q0FLaUQ7SUFGbEMsNExBQVcsZUFBQSxzQkFBZSxDQUFBLElBQUMsaUxBQ2YsZUFBQSx1QkFBZ0IsQ0FBQSxJQURELHFMQUVWLGVBQUEsc0JBQWUsQ0FBQSxJQUZMO0lBRzFDLGlCQUFnQjs7O0lBTEQsa0NBQWEsaUNBQUE7Ozs7SUFPNUIsMENBS21EO0lBRmxDLGlNQUFXLGVBQUEsc0JBQWUsQ0FBQSxJQUFDLHVMQUNmLGVBQUEsd0JBQWdCLENBQUEsSUFERCwyTEFFVixlQUFBLHVCQUFlLENBQUEsSUFGTDtJQUc1QyxpQkFBa0I7OztJQUxELGtDQUFhLGlDQUFBOzs7O0lBTzlCLDBDQUc2QztJQUE1QixrTUFBVyxlQUFBLHVCQUFlLENBQUEsSUFBQztJQUM1QyxpQkFBa0I7OztJQUhELGtDQUFhLGlDQUFBOzs7SUFLOUIsc0NBRW1COzs7SUFERCxrQ0FBYTs7OztJQUcvQix1Q0FLZ0Q7SUFGbEMsNExBQVcsZUFBQSx1QkFBZSxDQUFBLElBQUMsaUxBQ2YsZUFBQSx3QkFBZ0IsQ0FBQSxJQURELHFMQUVWLGVBQUEsdUJBQWUsQ0FBQSxJQUZMO0lBR3pDLGlCQUFlOzs7SUFMRCxrQ0FBYSxpQ0FBQTs7QURuQi9CLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxlQUFlO0lBRXZEO1FBQ0UsS0FBSyxFQUFFLENBQUM7SUFDVixDQUFDO0lBRUQsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQzNFLENBQUM7cUZBUlUsb0JBQW9CO29FQUFwQixvQkFBb0I7WUNUakMsOEJBQWtDO1lBQzlCLHlGQU1nQjtZQUVoQiw2RkFNa0I7WUFFbEIsNkZBSWtCO1lBRWxCLCtGQUVtQjtZQUVuQix1RkFNZTtZQUNuQixpQkFBTTs7WUFsQ0QsOENBQTRCO1lBQ2IsZUFBb0I7WUFBcEIscUNBQW9CO1lBUWxCLGVBQXdCO1lBQXhCLHlDQUF3QjtZQVF4QixlQUF3QjtZQUF4Qix5Q0FBd0I7WUFNdkIsZUFBeUI7WUFBekIsMENBQXlCOzs7dUZEZG5DLG9CQUFvQjtjQUpoQyxTQUFTOzJCQUNFLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRWRpdENlbGxEZWZhdWx0IH0gZnJvbSAnLi9lZGl0LWNlbGwtZGVmYXVsdCc7XHJcbmltcG9ydCB7IENlbGwgfSBmcm9tICcuLi8uLi8uLi9saWIvZGF0YS1zZXQvY2VsbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3RhYmxlLWNlbGwtZGVmYXVsdC1lZGl0b3InLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kZWZhdWx0LWVkaXQuY29tcG9uZW50Lmh0bWwnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGVmYXVsdEVkaXRDb21wb25lbnQgZXh0ZW5kcyBFZGl0Q2VsbERlZmF1bHQge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBnZXRFZGl0b3JUeXBlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5jZWxsLmdldENvbHVtbigpLmVkaXRvciAmJiB0aGlzLmNlbGwuZ2V0Q29sdW1uKCkuZWRpdG9yLnR5cGU7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgW25nU3dpdGNoXT1cImdldEVkaXRvclR5cGUoKVwiPlxyXG4gICAgPHNlbGVjdC1lZGl0b3IgKm5nU3dpdGNoQ2FzZT1cIidsaXN0J1wiXHJcbiAgICAgICAgICAgICAgICAgICBbY2VsbF09XCJjZWxsXCJcclxuICAgICAgICAgICAgICAgICAgIFtpbnB1dENsYXNzXT1cImlucHV0Q2xhc3NcIlxyXG4gICAgICAgICAgICAgICAgICAgKG9uQ2xpY2spPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgIChvbkVkaXRlZCk9XCJvbkVkaXRlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgIChvblN0b3BFZGl0aW5nKT1cIm9uU3RvcEVkaXRpbmcoKVwiPlxyXG4gICAgPC9zZWxlY3QtZWRpdG9yPlxyXG5cclxuICAgIDx0ZXh0YXJlYS1lZGl0b3IgKm5nU3dpdGNoQ2FzZT1cIid0ZXh0YXJlYSdcIlxyXG4gICAgICAgICAgICAgICAgICAgICBbY2VsbF09XCJjZWxsXCJcclxuICAgICAgICAgICAgICAgICAgICAgW2lucHV0Q2xhc3NdPVwiaW5wdXRDbGFzc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgIChvbkNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAgICAgIChvbkVkaXRlZCk9XCJvbkVkaXRlZCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgKG9uU3RvcEVkaXRpbmcpPVwib25TdG9wRWRpdGluZygpXCI+XHJcbiAgICA8L3RleHRhcmVhLWVkaXRvcj5cclxuXHJcbiAgICA8Y2hlY2tib3gtZWRpdG9yICpuZ1N3aXRjaENhc2U9XCInY2hlY2tib3gnXCJcclxuICAgICAgICAgICAgICAgICAgICAgW2NlbGxdPVwiY2VsbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgIFtpbnB1dENsYXNzXT1cImlucHV0Q2xhc3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAob25DbGljayk9XCJvbkNsaWNrKCRldmVudClcIj5cclxuICAgIDwvY2hlY2tib3gtZWRpdG9yPlxyXG5cclxuICAgIDxjb21wbGV0ZXItZWRpdG9yICpuZ1N3aXRjaENhc2U9XCInY29tcGxldGVyJ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICBbY2VsbF09XCJjZWxsXCI+XHJcbiAgICA8L2NvbXBsZXRlci1lZGl0b3I+XHJcblxyXG4gICAgPGlucHV0LWVkaXRvciAqbmdTd2l0Y2hEZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAgIFtjZWxsXT1cImNlbGxcIlxyXG4gICAgICAgICAgICAgICAgICBbaW5wdXRDbGFzc109XCJpbnB1dENsYXNzXCJcclxuICAgICAgICAgICAgICAgICAgKG9uQ2xpY2spPVwib25DbGljaygkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgKG9uRWRpdGVkKT1cIm9uRWRpdGVkKCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgICAob25TdG9wRWRpdGluZyk9XCJvblN0b3BFZGl0aW5nKClcIj5cclxuICAgIDwvaW5wdXQtZWRpdG9yPlxyXG48L2Rpdj4iXX0=