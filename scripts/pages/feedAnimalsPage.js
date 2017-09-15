const extend                = require('js-base/core/extend');
const FeedAnimalsPageDesign = require('ui/ui_feedAnimalsPage');
const Database              = require('sf-core/data').Database;
const Path                  = require('sf-core/io/path');
const File                  = require('sf-core/io/file');
const Router                = require("sf-core/ui/router");
const HeaderBarItem         = require('sf-core/ui/headerbaritem');
const Menu                  = require('sf-core/ui/menu');
const MenuItem              = require('sf-core/ui/menuitem');
const DatePicker            = require('sf-core/ui/datepicker');
const Color                 = require('sf-core/ui/color');

const FeedAnimalsPage = extend(FeedAnimalsPageDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    this.children.flexLayout1.children.textFlex.children.farmLabel.onTouch                          = farmLabel_onTouch.bind(this);
    this.children.flexLayout1.children.textFlex.children.flockLabel.onTouch                         = flockLabel_onTouch.bind(this);
    this.children.flexLayout1.children.textFlex.children.feedItemLabel.onTouch                      = feedItemLabel_onTouch.bind(this);
    this.children.flexLayout1.children.textFlex.children.dateLabel.onTouch                          = dateLabel_onTouch.bind(this);
    this.children.flexLayout1.children.textFlex.children.flexLayout4.children.uomLabel.onTouch      = uomLabel_onTouch.bind(this);
    this.children.flexLayout1.children.textFlex.children.flexLayout4.children.quantityLabel.onTextChanged = quantityLabel_onTextChanged.bind(this);
     this.children.flexLayout1.children.textFlex.children.flexLayout4.children.quantityLabel.onTouch= quantityLabel_onTouch.bind(this);
    this.children.flexLayout1.children.buttonFlex.children.addButton.onPress                        = addButton_onPress.bind(this);
    var myItem = new HeaderBarItem({      title: "Save",    });
    this.headerBar.title = "";
    this.headerBar.setItems([myItem]);
    myItem.onPress = addButton_onPress.bind(this);
  });

//Create database on local start
var database = new Database({
    file: new File({path:   Path.DataDirectory + "//tavukculuk.sqlite" })
  });
//End

// farmLabel onTouch event
var page;
var returnValue;
var returnFarmcode = 0;
function farmLabel_onTouch(){
  page = this;
  this.children.flexLayout1.children.textFlex.children.flockLabel.text = "..";
//Create and Define Menu and Menu Items
  var menu         = new Menu();
  menu.headerTitle = "Choose Farm";
  var satirlar     = [];
  var result       = database.query("SELECT * FROM 'F40601'");
  for(var i=0; i<result.count() ; i++)
  {
    var farmname   = result.get(i).getInteger('FARMCODE');
    var returnFarmcode1 = result.get(i).getInteger('FARMCODE');
    farmname += "-";
    farmname += result.get(i).getString('FARMNAME');
    var menuItem1 = new MenuItem({title: farmname, farmcode: returnFarmcode1});
    menuItem1.onSelected = function(){
      returnValue = this.title;
      returnFarmcode = this.farmcode;
      farmName_onSelected(page);
    };
    satirlar[i] = menuItem1;
  }
  menu.items = satirlar;
  menu.show(this);
//End Menu
}
//End

// farmName onSelected event
function farmName_onSelected(page){
  page.children.flexLayout1.children.textFlex.children.farmLabel.text = returnValue;
}
//End

// flockLabel onTouchEnded event
var returnValue1;
var returnFlockId = 0;
function flockLabel_onTouch(){
  page = this;
//Create and Define Menu and Menu Items
  var menu         = new Menu();
  menu.headerTitle = "Choose Flock";
  var satirlar     = [];
  var result       = database.query("SELECT * FROM 'F64PL001' WHERE (FARMCODE LIKE '" + returnFarmcode + "%') ");
  for(var i=0; i<result.count() ; i++)
  {
    var flockid   = result.get(i).getInteger('ZXFLOCKID');
    returnFlockId = flockid;
    flockid += "-";
    flockid += result.get(i).getString('ZXFLOCKDSC1');
    var menuItem1 = new MenuItem({title: flockid});
    menuItem1.onSelected = function(){
      returnValue1 = this.title;
      flockId_onSelected(page);
    };
    satirlar[i] = menuItem1;
  }
  menu.items = satirlar;
  menu.show(this);
//End Menu
}
//End

// flockId onSelected event
function flockId_onSelected(page){
  page.children.flexLayout1.children.textFlex.children.flockLabel.text = returnValue1;
}
//End

// feedItemLabel onTouchEnded event
var returnValue2;
var returnFeedItemNo = 0;
function feedItemLabel_onTouch(){
  page = this;
//Create and Define Menu and Menu Items
  var menu         = new Menu();
  menu.headerTitle = "Choose Feed Item";
  var satirlar     = [];
  var result       = database.query("SELECT * FROM 'F4101'");
  for(var i=0; i<result.count() ; i++)
  {
    var flockid      = result.get(i).getInteger('LITM');
    returnFeedItemNo = flockid;
    flockid += "-";
    flockid += result.get(i).getString('DSC1');
    var menuItem1 = new MenuItem({title: flockid});
    menuItem1.onSelected = function(){
      returnValue2 = this.title;
      feedItemNo_onSelected(page);
    };
    satirlar[i] = menuItem1;
  }
  menu.items = satirlar;
  menu.show(this);
//End Menu
}

// flockId onSelected event
function feedItemNo_onSelected(page){
  page.children.flexLayout1.children.textFlex.children.feedItemLabel.text = returnValue2;
}
//End

var definedDate = "";
var returnDay1 = "0";
var returnMonth1 = "0";
var returnDate1 = "";
var returnDate  = 0;
// dateLabel onTouch event
function dateLabel_onTouch(){
  definedDate = "";
  returnDay1 = "0";
  returnMonth1 = "0";
  returnDate1 = "";
  returnDate  = 0;
  //Create Datepicker
  var myDatePicker = new DatePicker();
  myDatePicker.onDateSelected = function(date){
    definedDate = "";
    var day   = date.getDate();
    var newDay = "0";
    var month = date.getMonth()+1;
    var newMonth = "0";
    var year  = date.getFullYear();
    if(day < 10)
    {
      newDay += day;
      returnDay1 += day;
    }
    else
    {
      newDay = day;
      returnDay1 = day;
    }
    if(month < 10)
    {
      newMonth += month;
      returnMonth1 += month;
    }
    else
    {
      newMonth = month;
      returnMonth1 = month;
    }
    definedDate = newDay + "." + newMonth + "." + year;
    returnDate1 += year + returnMonth1 + returnDay1;
    returnDate = returnDate1;
    myDatePicker_dateSelected(page);
  };
  myDatePicker.show();
}
// End

// This function will call when Datepicker on selected
function myDatePicker_dateSelected(page){
  page.children.flexLayout1.children.textFlex.children.dateLabel.text = definedDate;
}
// End

var returnValue3;
function uomLabel_onTouch(){
//Create and Define Menu and Menu Items
  var menu         = new Menu();
  menu.headerTitle = "Choose Unit of Measure";
  var satirlar     = ["kg" , "gr" , "mt" , "cm" , "tons" , "pieces"];
  for(var i=0; i<satirlar.length ; i++)
  {
    var farmname   = satirlar[i];
    var menuItem1  = new MenuItem({title: farmname});
    menuItem1.onSelected = function(){
      returnValue3 = this.title;
      uomLabelItem_onSelected(page);
    };
    satirlar[i] = menuItem1;
  }
  menu.items = satirlar;
  menu.show(this);
//End Menu
}
//End

// This function will call when Datepicker on selected
function uomLabelItem_onSelected(page){
  page.children.flexLayout1.children.textFlex.children.flexLayout4.children.uomLabel.text = returnValue3;
}
// End

// Start Quantity Textbox on editEnds
function quantityLabel_onTextChanged(e){
  this.children.flexLayout1.children.textFlex.children.flexLayout4.children.quantityLabel.backgroundColor = Color.WHITE;
  var textValue = this.children.flexLayout1.children.textFlex.children.flexLayout4.children.quantityLabel.text;
  for(var i=0; i< textValue.length; i++)
  {
    if(e.insertedText == ',')
    {
      this.children.flexLayout1.children.textFlex.children.flexLayout4.children.quantityLabel.backgroundColor = Color.RED;
    }
  }
}
// End

function quantityLabel_onTouch(){
   this.children.flexLayout1.children.textFlex.children.flexLayout4.children.quantityLabel.text = "";
}

// addButton onPress event
var id = 2;
function addButton_onPress(){
  this.children.flexLayout1.children.textFlex.children.flexLayout4.children.quantityLabel.removeFocus();
  var returnUnits = page.children.flexLayout1.children.textFlex.children.flexLayout4.children.quantityLabel.text;
  id++;
  database.execute("INSERT INTO 'FEEDCONS'('id','ZXFLOCKID','FARMCODE','DATE','LITM','QTY','UOM' ) VALUES ('" + id + "' , '" + returnFlockId + "' , '" + returnFarmcode + "', '" + returnDate + "', '" + returnFeedItemNo + "', '" + returnUnits + "', '" + returnValue3 + "') ");
  Router.goBack("feedCons");
}
//End

function onShow(superOnShow) {
  this.children.flexLayout1.children.textFlex.children.farmLabel.text                           = "..";
  this.children.flexLayout1.children.textFlex.children.flockLabel.text                          = "..";
  this.children.flexLayout1.children.textFlex.children.feedItemLabel.text                       = "..";
  this.children.flexLayout1.children.textFlex.children.dateLabel.text                           = "..";
  this.children.flexLayout1.children.textFlex.children.flexLayout4.children.quantityLabel.text  = "..";
  this.children.flexLayout1.children.textFlex.children.flexLayout4.children.uomLabel.text       = "..";
  superOnShow();
}

function onLoad(superOnLoad) {
  superOnLoad();
}

module && (module.exports = FeedAnimalsPage);