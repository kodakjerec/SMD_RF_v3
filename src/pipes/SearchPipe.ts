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
    name: 'myfilter'
})
export class SearchPipe implements PipeTransform {
    transform(records: Array<any>, args?: any): any {
        if (!records || !args)
            return records;

        return records.filter(record => record[args.property].indexOf(args.keyword)!==-1);
    };
}