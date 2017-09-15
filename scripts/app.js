/* globals lang */
require("i18n/i18n.js"); // Generates global lang object

const Application = require("sf-core/application");

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function(e) {
    alert({
        title: lang.applicationError,
        message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
    });
};


const Router = require("sf-core/ui/router");
const stylerBuilder = require("library/styler-builder");
const settings = require("./settings.json");
stylerBuilder.registerThemes(settings.config.theme.themes || "Defaults");
stylerBuilder.setActiveTheme(settings.config.theme.currentTheme);

// Define routes and go to initial page of application
Router.add("loginPage", require("./pages/loginPage"));
Router.add("choosePage", require("./pages/choosePage"));
Router.add("farmMasterPage", require("./pages/farmMasterPage"));
Router.add("feedCons", require("./pages/feedCons"));
Router.add("feedItemMaster", require("./pages/feedItemMaster"));
Router.add("flockMasterPage", require("./pages/flockMasterPage"));
Router.add("farmCreatePage", require("./pages/farmCreatePage"));
Router.add("addFeedItemPage", require("./pages/addFeedItemPage"));
Router.add("addFlockPage", require("./pages/addFlockPage"));
Router.add("feedAnimalsPage", require("./pages/feedAnimalsPage"));
Router.add("chartsPage", require("./pages/chartsPage"));
Router.add("graphicsPage", require("./pages/graphicsPage"));
Router.go("loginPage");
