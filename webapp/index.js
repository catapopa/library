sap.ui.define(
  ["sap/ui/core/mvc/XMLView"],

  function (XMLView) {
    "use strict";

    XMLView.create({
      viewName: "lib.view.Book",
    }).then(function (oView) {
      oView.placeAt("content");
    });
  }
);
