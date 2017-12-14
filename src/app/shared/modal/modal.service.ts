// import { Injectable } from "@angular/core";
// import { NgbModalOptions, NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
// import { ModalOptions, ModalResult, ModalIconTypes } from "app/shared/modal/modal";


// @Injectable()
// export class ModalService {
//     modalSettingsDefault: NgbModalOptions;

//     public addErrorReport: (message: string) => void;

//     constructor(
//         private $uibModal: NgbModal,
//         private appRootUrl: string,
//         private $uibModalStack: NgbActiveModal) {

//         this.modalSettingsDefault = {
//             backdrop: true,
//             keyboard: true,
//             windowClass: 'modal-alert',
//             // templateUrl: this.appRootUrl + "ui/modal/modal.html",
//             // controller: 'modalController'
//         }
//     }
//     //     // public OpenComponentModal(modalTitle: string, componentName: string, bindings?) {
//     //     //     let resolve = {
//     //     //         component: () => {
//     //     //             return componentName;
//     //     //         },
//     //     //         title: () => {
//     //     //             return modalTitle;
//     //     //         },
//     //     //         bindings: () => {
//     //     //             return bindings;
//     //     //         }
//     //     //     };
//     //     //     return this.$uibModal.open({
//     //     //         animation: true,
//     //     //         component: 'modalView',
//     //     //         resolve: resolve
//     //     //     });
//     //     // }

//     //     public ShowError(message: string) {
//     //         if (message && this.addErrorReport) {
//     //             this.addErrorReport(message);
//     //         }
//     //     }

//     public ShowModal(modalOptions: ModalOptions, modalSettings?: NgbModalOptions): Promise<any> {
//         // if (!modalSettings) modalSettings = {};
//         // modalSett.resolve = { modalOptions: () => { return modalOptions; } };
//         // return this.show(modalSett).result;
//     }

//     public ShowAlert(message: string, answerCallback?: (state?: number) => void) {
//         var modalOptions: ModalOptions = {
//             bodyIcon: ModalIconTypes.IconWarning,
//             bodyText: message,
//             yes: {
//                 buttonText: 'Закрыть',
//                 getResultAction: ($scope: any, ngbModalService: NgbModal) => { return { state: 0 } }
//             }
//         };

//         this.ShowModal(modalOptions).then((res: ModalResult) => {
//             if (answerCallback) {
//                 if ('state' in res)
//                     answerCallback(res.state);
//                 else
//                     answerCallback(-1);
//             }
//         });
//     }

//     public ShowConfirm(answer: string, yesCallback?: () => void, noCallback?: () => void) {
//         var modalOptions: ModalOptions = {
//             bodyIcon: ModalIconTypes.IconHelp,
//             bodyText: answer,
//             yes: {
//                 buttonText: 'Подтвердить',
//                 getResultAction: () => { return { state: 0 } }
//             },
//             cancel: {
//                 buttonText: 'Отменить',
//                 getResultAction: () => { return { state: 1 } }
//             }
//         };
//         this.ShowModal(modalOptions).then((res: ModalResult) => {
//             if ('state' in res && res.state == 0) {
//                 if ('undefined' != typeof yesCallback)
//                     yesCallback();
//             }
//             else {
//                 if ('undefined' != typeof noCallback)
//                     noCallback();
//             }
//         });
//     }

//     //     private show(customModalDefaults: NgbModalOptions ): NgbModal  {
//     //         this.$uibModalStack.dismissAll(); /* закрываем предыдущие окна перед открытием нового */
//     //         //Create temp objects to work with since we're in a singleton service
//     //         var tempModalDefaults: NgbModalOptions  = {};
//     //         //Map angular-ui modal custom defaults to modal defaults defined in service
//     //         angular.extend(tempModalDefaults, customModalDefaults, this.modalSettingsDefault);
//     //         return this.$uibModal.open(tempModalDefaults);
//     //     };
// }