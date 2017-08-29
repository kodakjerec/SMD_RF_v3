import { NgModule } from '@angular/core';

// Pipes
import { OrderByPipe } from './BasketList_pipe';
@NgModule({
    declarations: [
        OrderByPipe
    ],
    imports: [

    ],
    exports: [
        OrderByPipe
    ]
})
export class PipesModule {
    myOrderByPipe= new OrderByPipe();
}