import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
    titleChanged = new EventEmitter<{ name: string, sede: string }>();

    emitTitleChange(info: { name: string, sede: string }) {
        this.titleChanged.emit(info);
    }
}
