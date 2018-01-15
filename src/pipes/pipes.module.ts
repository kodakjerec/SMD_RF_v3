import { NgModule } from '@angular/core';

// Pipes
import { OrderByPipe } from './BasketList_pipe';
import { SearchPipe } from './SearchPipe';

@NgModule({
    declarations: [
        OrderByPipe
        , SearchPipe
    ],
    imports: [

    ],
    exports: [
        OrderByPipe
        , SearchPipe
    ]
})
export class PipesModule {
    myOrderByPipe = new OrderByPipe();
    mySearchPipe = new SearchPipe();
}