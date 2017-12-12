import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

export interface ModalButtons {
    buttonText: string;
    getResultAction?: ($scope: any, modalService: NgbModal) => ModalResult;
    buttonClass?: string;
}

export class ModalIconTypes {
    static IconAttention: string = 'pe-7s-attention';
    static IconInfo: string = 'pe-7s-info';
    static IconHelp: string = 'pe-7s-help1';
    static IconShield: string = 'pe-7s-shield';
    static IconError: string = 'pe-7s-attention';
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