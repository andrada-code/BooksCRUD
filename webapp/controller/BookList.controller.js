sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel"
 ], function (Controller, MessageToast, Fragment, ResourceModel, Filter, FilterOperator) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.BookList", {

        onInit : function () {
            var i18nModel = new ResourceModel({
               bundleName: "org.ubb.books.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");
        },

        onDeleteBook(oEvent) {

            const aSelContexts = this.byId("idBooksTable").getSelectedContexts();

            const sPathToBook = aSelContexts[0].getPath();

            this.getView().getModel().remove(sPathToBook, {
                success : () => {
                    MessageToast.show("Book deleted!");
                    
                    //var oBundle = this.getView().getModel("i18n").getResourceBundle();
                    //var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                    //var sMsg = oBundle.getText("Book deleted!", [sRecipient]);    
                },
                error : () => {
                    MessageToast.show("Book could not be deleted!");
                }
            });

        },

        onAddBook(oEvent){
            this.byId("addDialog").open();

            
            this.getView().byId("isbn").setValue("");
            this.getView().byId("title").setValue("");
            this.getView().byId("author").setValue("");
            this.getView().byId("datepub").setValue("");
            this.getView().byId("language").setValue("");
            this.getView().byId("availablebooks").setValue("");
            this.getView().byId("totalbooks").setValue("");
        },

        onCloseAdd(oEvent){
            this.byId("addDialog").close();
        },

        onBookAdd(oEvent){

            var oBook =  {
                Isbn: "",
                Author: "",
                Title: "",
                Pdate: "",
                Language: "",
                Tnrbooks: 0,
                Avnrbooks: 0,
                Createdon: "",
                Createdby: "",
                Changedon: "",
                Changedby: ""
            };

            oBook.Isbn = this.getView().byId("isbn").getValue();
            oBook.Title = this.getView().byId("title").getValue();
            oBook.Author = this.getView().byId("author").getValue();
            oBook.Language = this.getView().byId("language").getValue();
            oBook.Avnrbooks = parseInt(this.getView().byId("availablebooks").getValue());
            oBook.Tnrbooks = parseInt(this.getView().byId("totalbooks").getValue());

            oBook.Pdate = "2015-12-31T00:00:00";
            oBook.Createdon = "2015-12-31T00:00:00";
            oBook.Changedon = "2015-12-31T00:00:00";

            this.getView().getModel().create("/Books", oBook, {
                success : () => {
                    MessageToast.show("Book added!");
                },
                error : () => {
                    MessageToast.show("Book could not be added!");
                }
            });
            
        },

        onUpdateBook(oEvent) {
            this.byId("updateDialog").open();
            
            this.getView().byId("isbnUpdate").setValue("");
            this.getView().byId("titleUpdate").setValue("");
            this.getView().byId("authorUpdate").setValue("");
            this.getView().byId("datepubUpdate").setValue("");
            this.getView().byId("languageUpdate").setValue("");
            this.getView().byId("availablebooksUpdate").setValue("");
            this.getView().byId("totalbooksUpdate").setValue("");
        },

        onCloseUpdate(oEvent){
            this.byId("updateDialog").close();
        },

        onBookUpdate(oEvent){

            const aSelContexts = this.byId("idBooksTable").getSelectedContexts();

            const sPathToBook = aSelContexts[0].getPath();

            var oBook =  {
                Isbn: "",
                Author: "",
                Title: "",
                Pdate: "",
                Language: "",
                Tnrbooks: 0,
                Avnrbooks: 0,
                Createdon: "",
                Createdby: "",
                Changedon: "",
                Changedby: ""
            };

            oBook.Isbn = this.getView().byId("isbnUpdate").getValue();
            oBook.Title = this.getView().byId("titleUpdate").getValue();
            oBook.Author = this.getView().byId("authorUpdate").getValue();
            oBook.Language = this.getView().byId("languageUpdate").getValue();
            oBook.Avnrbooks = parseInt(this.getView().byId("availablebooksUpdate").getValue());
            oBook.Tnrbooks = parseInt(this.getView().byId("totalbooks").getValue());

            oBook.Pdate = "2015-12-31T00:00:00";
            oBook.Createdon = "2015-12-31T00:00:00";
            oBook.Changedon = "2015-12-31T00:00:00";

            this.getView().getModel().update(sPathToBook, oBook, {
                success : () => {
                    MessageToast.show("Book updated!");
                },
                error : () => {
                    MessageToast.show("Book could not be updated!");
                }
            });
            
        },


        onFilterBooks : function (oEvent) {
            // filter binding
                var oTable = this.byId("idBooksTable"),
                    oBinding = oTable.getBinding("items"),
                    aFilters = [];
    
                aFilters.push(new Filter("Title", sap.ui.model.FilterOperator.Contains, oEvent.oSource.getValue()));
                aFilters.push(new Filter("Author", sap.ui.model.FilterOperator.Contains, oEvent.oSource.getValue()));
                // aFilters.push(new Filter("Language", sap.ui.model.FilterOperator.Contains, oEvent.oSource.getValue()));
    
                oBinding.filter(new Filter({
                    filters: aFilters,
                    and: false
                }));
           }

// onBookUpdate : function () {
//     var currentDate = new Date(),
//         oView = this.getView(),
//         oModel = oView.getModel(),
//         oData = {
//             Isbn: oView.byId('isbnUpdate').getValue(),
//             Title: oView.byId('titleUpdate').getValue(),
//             Author: oView.byId('authorUpdate').getValue(),
//             Pdate: new Date(oView.byId('datepubUpdate').getValue()),
//             Language: oView.byId('languageUpdate').getValue(),
//             Tnrbooks: parseInt(oView.byId('totalbooks').getValue()),
//             Avnrbooks: parseInt(oView.byId('availablebooksUpdate').getValue()),
//             Createdon: "2015-12-31T00:00:00",
//             Changedon: "2015-12-31T00:00:00"
//         },
//         oIsbn = oView.byId('isbnUpdate').getValue(),
//         that = this;
    
//     oView.setBusy(true);

//     oModel.update("/Books('"+oIsbn+"')", oData, {
//         success: function () {
//             oView.setBusy(false);
//             that.byId("updateDialog").close();
//             location.reload();
//             MessageToast.show("Update successful");
//         },
//         error: function () {
//             oView.setBusy(false);
//             MessageToast.show("Update unsuccessful");
//         }
//     });
// }

     });
  });