sap.ui.define([
	'sap/ui/core/mvc/Controller',
], function(Controller) {
	'use strict';
	return Controller.extend('org.ubb.books.controller.Book', {

		onDeleteBook(oEvent) {
			const aSelContexts = this.byId('idBooksTable').getSelectedContexts();
			const sPathToBook = aSelContexts[0].getPath();
			this.getView().getModel().remove(sPathToBook);
		},

		getDialog: function() {
			if (!this.dialog) {
				// This fragment can be instantiated from a controller as follows:
				this.dialog = sap.ui.xmlfragment('idForm', 'org.ubb.books.view.form',	this);
			}
			return this.dialog;
		},

		getDialogUpdate: function() {
			if (!this.dialog) {
				// This fragment can be instantiated from a controller as follows:
				this.dialog = sap.ui.xmlfragment('idFormUpdate',
						'org.ubb.books.view.updateForm', this);
			}
			return this.dialog;
		},

		closeDialog: function() {
			this.getDialog().close();
		},

		onSave: function() {
			const oISBN = sap.ui.getCore().byId('idForm--idIsbn').getValue();
			const oTitle = sap.ui.getCore().byId('idForm--idTitle').getValue();
			const oAuthor = sap.ui.getCore().byId('idForm--idAuthor').getValue();
			const oLanguage = sap.ui.getCore().byId('idForm--idLanguage').getValue();
			const oDate = sap.ui.getCore().byId('idForm--idDate').getDateValue();
			const oTotal = sap.ui.getCore().byId('idForm--idTotalBooks').getValue();
			const oAvailable = sap.ui.getCore().byId('idForm--idAvailableBooks').getValue();

			const dateFormat = sap.ui.core.format.DateFormat.getDateInstance(
					{pattern: 'yyyy-MM-ddTHH:mm:ss'});
			const date = new Date(oDate);
			const dateFormatted = dateFormat.format(oDate);

			const oBook = {
				'Isbn': oISBN,
				'Title': oTitle,
				'Author': oAuthor,
				'Language': oLanguage,
				'DatePublished': dateFormatted,
				'Totalbooks': parseInt(oTotal),
				'Availbooks': parseInt(oAvailable),
			};

			this.odataModel = new sap.ui.model.odata.ODataModel(
					'/sap/opu/odata/SAP/Z801_LIBRARY_CAPO_SRV');
			this.odataModel.create('/z801_book_entity_capoSet', oBook);
		},

		onUpdate: function() {
			const oISBN = sap.ui.getCore().byId('idFormUpdate--idIsbn').getValue();
			const oTitle = sap.ui.getCore().byId('idFormUpdate--idTitle').getValue();
			const oAuthor = sap.ui.getCore().byId('idFormUpdate--idAuthor').getValue();
			const oLanguage = sap.ui.getCore().byId('idFormUpdate--idLanguage').getValue();
			const oDate = sap.ui.getCore().byId('idFormUpdate--idDate').getDateValue();
			const oTotal = sap.ui.getCore().byId('idFormUpdate--idTotalBooks').getValue();
			const oAvailable = sap.ui.getCore().byId('idFormUpdate--idAvailableBooks').getValue();

			const dateFormat = sap.ui.core.format.DateFormat.getDateInstance(
					{pattern: 'yyyy-MM-ddTHH:mm:ss'});
			const date = new Date(oDate);
			const dateFormatted = dateFormat.format(oDate);

			const oBook = {
				'Isbn': oISBN,
				'Title': oTitle,
				'Author': oAuthor,
				'Language': oLanguage,
				'DatePublished': dateFormatted,
				'Totalbooks': parseInt(oTotal),
				'Availbooks': parseInt(oAvailable),
			};

			this.odataModel = new sap.ui.model.odata.ODataModel(
					'/sap/opu/odata/SAP/Z801_LIBRARY_CAPO_SRV');
			this.odataModel.update('/z801_book_entity_capoSet(\'' + oISBN + '\')',
					oBook, null, function() {
						alert('Update successful');
					}, function() {
						alert('Error!');
					},
			);
		},

		onAddBook(oEvent) {
			this.getDialog().open();

			sap.ui.getCore().byId('idForm--idIsbn').setValue();
			sap.ui.getCore().byId('idForm--idTitle').setValue();
			sap.ui.getCore().byId('idForm--idAuthor').setValue();
			sap.ui.getCore().byId('idForm--idLanguage').setValue();
			sap.ui.getCore().byId('idForm--idDate').setValue();
			sap.ui.getCore().byId('idForm--idTotalBooks').setValue();
			sap.ui.getCore().byId('idForm--idAvailableBooks').setValue();
		},

		onUpdateBook(oEvent) {
			const oTable = this.getView().byId('idBooksTable');
			const selectedItem = oTable.getSelectedItem();
			const isbn = selectedItem.getBindingContext().getProperty('Isbn');
			const title = selectedItem.getBindingContext().getProperty('Title');
			const author = selectedItem.getBindingContext().getProperty('Author');
			const language = selectedItem.getBindingContext().getProperty('Language');
			const date = selectedItem.getBindingContext().getProperty('DatePublished');
			const total = selectedItem.getBindingContext().getProperty('Totalbooks');
			const available = selectedItem.getBindingContext().getProperty('Availbooks');

			this.getDialogUpdate().open();

			const dateFormat = sap.ui.core.format.DateFormat.getDateInstance(
					{pattern: 'dd/MM/yyyy'});
			const date1 = new Date(date);
			const dateFormatted = dateFormat.format(date1);

			sap.ui.getCore().byId('idFormUpdate--idIsbn').setValue(isbn);
			sap.ui.getCore().byId('idFormUpdate--idTitle').setValue(title);
			sap.ui.getCore().byId('idFormUpdate--idAuthor').setValue(author);
			sap.ui.getCore().byId('idFormUpdate--idLanguage').setValue(language);
			sap.ui.getCore().byId('idFormUpdate--idDate').setValue(dateFormatted);
			sap.ui.getCore().byId('idFormUpdate--idTotalBooks').setValue(total);
			sap.ui.getCore().byId('idFormUpdate--idAvailableBooks').setValue(available);
		},
	});
});
