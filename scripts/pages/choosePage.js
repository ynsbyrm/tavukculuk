const extend                = require('js-base/core/extend');
const ChoosePageDesign      = require('ui/ui_choosePage');
const Router                = require('sf-core/ui/router');
const Database              = require('sf-core/data').Database;
const Path                  = require('sf-core/io/path');
const File                  = require('sf-core/io/file');

const ChoosePage = extend(ChoosePageDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    this.children.flexLayout1.children.button1.onPress = farmMasterPage.bind(this);
    this.children.flexLayout1.children.button2.onPress = flockMasterPage.bind(this);
    this.children.flexLayout1.children.button3.onPress = feedConsPage.bind(this);
    this.children.flexLayout1.children.button4.onPress = feedItemMasterPage.bind(this);
    this.children.flexLayout1.children.button5.onPress = addTables.bind(this);
    this.children.flexLayout1.children.button6.onPress = dropTables.bind(this);
    this.children.button6.onPress                      = button6_onPress.bind(this);
    this.children.button1.onPress                      = button1_onPress.bind(this);
  });
  var database = new Database({
    file: new File({path:   Path.DataDirectory + "//tavukculuk.sqlite" })
  });
  
function farmMasterPage(){Router.go("farmMasterPage")}
function feedConsPage(){Router.go("feedCons")}
function feedItemMasterPage(){Router.go("feedItemMaster")}
function flockMasterPage(){Router.go("flockMasterPage")}

function addTables(){
  database.execute("CREATE TABLE 'F40601'('FARMCODE' INTEGER NOT NULL, 'FARMNAME' TEXT, PRIMARY KEY ('FARMCODE') ) ");
  database.execute("CREATE TABLE 'F4101'('LITM' INTEGER NOT NULL, 'DSC1' TEXT, 'SRP1' TEXT, 'SRP2' TEXT, PRIMARY KEY('LITM') ) ");
  database.execute("CREATE TABLE 'F64PL001'('ZXFLOCKID' INTEGER NOT NULL, 'ZXFLOCKDSC1' TEXT, 'FARMCODE' INTEGER NOT NULL, 'ZXHOUSEID' TEXT, PRIMARY KEY ('ZXFLOCKID'), FOREIGN KEY(FARMCODE) REFERENCES F40601(FARMCODE) ) ");
  database.execute("CREATE TABLE 'FEEDCONS'('id' INTEGER DEFAULT 0, 'ZXFLOCKID' INTEGER NOT NULL, 'FARMCODE' INTEGER NOT NULL, 'DATE' INTEGER, 'LITM' INTEGER NOT NULL, 'QTY' TEXT, 'UOM' TEXT, PRIMARY KEY ('id'), FOREIGN KEY(FARMCODE) REFERENCES F40601(FARMCODE), FOREIGN KEY(ZXFLOCKID) REFERENCES F64PL001(ZXFLOCKID), FOREIGN KEY(LITM) REFERENCES F4101(LITM)  ) ");
}

function dropTables(){
  database.execute("DROP TABLE 'F40601'");
  database.execute("DROP TABLE 'F4101'");
  database.execute("DROP TABLE 'F64PL001'");
  database.execute("DROP TABLE 'FEEDCONS'");
}

function button6_onPress(){
  Router.go("chartsPage");
}

function button1_onPress(){
  Router.go("graphicsPage");
}

function onShow(superOnShow) {
  superOnShow();
}

function onLoad(superOnLoad) {
  superOnLoad();
}

module && (module.exports = ChoosePage);