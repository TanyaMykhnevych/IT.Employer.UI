import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ChatService } from './chat.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [],
})
export class ChatModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: ChatModule,
            providers: [
                ChatService,
            ],
        };
    }
}
