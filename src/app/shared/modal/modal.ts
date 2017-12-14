import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

export interface ModalButtons {
    buttonText: string;
    getResultAction?: ($scope: any, modalService: NgbModal) => ModalResult;
    buttonClass?: string;
}

export class ModalIconTypes {
    static IconWarning: string = 'fa-exclamation-triangle';
    static IconInfo: string = 'fa-info';
    static IconHelp: string = 'fa-comment-o';
    static IconShield: string = 'fa-shield';
    static IconError: string = 'fa-exclamation';
}

export interface ModalOptions {
    //headerText?: string;
    bodyIcon?: string;
    bodyText: string;
    buttons?: ModalButtons[];
    yes?: ModalButtons;
    cancel?: ModalButtons;
}

export interface ModalResult {
    state: number;
    result?: any;
}