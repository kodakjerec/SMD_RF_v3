//排序
/*
    sample:     transform(this.DCS_Log, { property: 'scanTime', direction: -1 });
    HowToUse:   transform( Array[], {property: string, direction: boolean});
    Inputs:     property: ColumnName
                direction: 1:Ascending -1:Descending
                Array[]: You want to sort
*/
import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
    transform(records: Array<any>, args?: any): any {

        return records.sort(function (a, b) {
            if (a[args.property] < b[args.property]) {
                return -1 * args.direction;
            }
            else if (a[args.property] > b[args.property]) {
                return 1 * args.direction;
            }
            else {
                return 0;
            }
        });
    };
}