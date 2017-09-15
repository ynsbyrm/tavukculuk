const extend                = require('js-base/core/extend');
const LoginPageDesign       = require('ui/ui_loginPage');
const Router                = require("sf-core/ui/router");

const LoginPage = extend(LoginPageDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    this.children.loginButton.onPress = loginButton_onPress.bind(this);
  });

function loginButton_onPress(){
  this.children.userName.children.userNameInput.removeFocus();
  this.children.password.children.passwordInput.removeFocus();
  //Go page
  Router.go("choosePage");
}

function onShow(superOnShow) {
  superOnShow();
}

function onLoad(superOnLoad) {
  superOnLoad();
}

module && (module.exports = LoginPage);