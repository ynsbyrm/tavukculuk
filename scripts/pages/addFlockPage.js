const extend                = require('js-base/core/extend');
const AddFlockPageDesign    = require('ui/ui_addFlockPage');
const Database              = require('sf-core/data').Database;
const Path                  = require('sf-core/io/path');
const File                  = require('sf-core/io/file');
const AlertView             = require('sf-core/ui/alertview');
const Color                 = require('sf-core/ui/color');
const Router                = require("sf-core/ui/router");
const HeaderBarItem         = require('sf-core/ui/headerbaritem');
const Menu                  = require('sf-core/ui/menu');
const MenuItem              = require('sf-core/ui/menuitem');

const AddFlockPage = extend(AddFlockPageDesign)(
  // Constructor
  function(_super) {
    // Start superFunction 
    _super(this);
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    //bind buttons and textbox events to functions
    this.children.flexLayout1.children.textBox1.onTouch                     = textBox1onTouch.bind(this);
    this.children.flexLayout1.children.textBox2.onTouch                     = textBox2onTouch.bind(this);
    this.children.flexLayout1.children.label4.onTouch                       = label4onTouch.bind(this);
    this.children.flexLayout1.children.flexLayout2.children.button1.onPress = addFlock_onPress.bind(this);
    //Create Headerbar right item and define onPress event
    var myItem = new HeaderBarItem({
      title: "Save",
    });
    this.headerBar.title = "";
    this.headerBar.setItems([myItem]);
    myItem.onPress = addFlock_onPress.bind(this);
    //End superFunction
  });

//Create database on local start
var database = new Database({
    file: new File({path:   Path.DataDirectory + "//tavukculuk.sqlite" })
  });
//End


// Textbox1 onTouch event
var text1 = 0;
function textBox1onTouch(){
  if(text1 == 0)
  {
    this.children.flexLayout1.children.textBox1.text = "";
    text1++;
  }
}
// End

// Textbox2 onTouch event
var text2 = 0;
function textBox2onTouch(){
  if(text2 == 0)
  {
    this.children.flexLayout1.children.textBox2.text = "";
    text2++;
  }
}
//End

// Label4 onTouchEnded event
var page;
var returnValue;
function label4onTouch(){
  page = this;
//Create and Define Menu and Menu Items
  var menu = new Menu();
  menu.headerTitle = "Choose Farm";
  var satirlar = [];
  var result = database.query("SELECT * FROM 'F40601'");
  for(var i=0; i<result.count() ; i++)
  {
    var farmname = result.get(i).getInteger('FARMCODE');
    farmname += "-";
    farmname += result.get(i).getString('FARMNAME');
    var menuItem1 = new MenuItem({title: farmname});
    menuItem1.onSelected = function(){
      returnValue = this.title;
      menuItem1_onSelected(page);
    };
    satirlar[i] = menuItem1;
  }
  menu.items = satirlar;
  menu.show(this);
//End Menu
}
//End

// menuItem1 onSelected event
function menuItem1_onSelected(page){
  page.children.flexLayout1.children.label4.text = returnValue;
}
//End

// Alertview for Farmcode Start
var alertView1 = new AlertView({
  title:    "Flock ID Error",
  message:  "Flock ID is already exist. Please check it",
});
//end

//addItem_onPress event and headerbar right item onPress event start
function addFlock_onPress(){
  
  this.children.flexLayout1.children.textBox1.removeFocus();
  this.children.flexLayout1.children.textBox2.removeFocus();
    
  var flockIdMatch  = 0;
  var flockDscMatch = 0;
  var farmCodeMatch = 0;
  var flockId   = this.children.flexLayout1.children.textBox1.text;
  var flockDsc  = this.children.flexLayout1.children.textBox2.text;
  var farmcode  = this.children.flexLayout1.children.label4.text;
  var newFarmcodeString = "";
  for(var i=0; i < farmcode.length ; i++)
  {
    if(farmcode[i] != '-')
    {
      newFarmcodeString += farmcode[i];
    }
    if(farmcode[i] == '-')
    {
      i = farmcode.length;
    }
  }
  var newFarmcodeInteger = 0;
  newFarmcodeInteger = newFarmcodeString;
  var result    = database.query("SELECT * FROM 'F64PL001'");
  
  for(var j=0; j<result.count(); j++)
  {
    var gelenFlockId = result.get(j).getInteger('ZXFLOCKID');
    var gelenFlockDsc = result.get(j).getString('ZXFLOCKDSC1');
    var gelenFarmCode = result.get(j).getInteger('FARMCODE');
    if(flockId == gelenFlockId)
    {
      flockIdMatch++;
    }
    if(flockDsc == gelenFlockDsc)
    {
      flockDscMatch++;
    }
    if(newFarmcodeInteger == gelenFarmCode)
    {
      farmCodeMatch++;
    }
  }
  
  //Check ZXFLOCKID is unique or NOT?
  if(flockIdMatch != 0)
  {
    this.children.flexLayout1.children.textBox1.backgroundColor = Color.RED;
    alertView1.title  = "Flock ID Error";
    alertView1.message = "Flock ID is already exist. Please check it";
    alert(alertView1);
  }
  
  else if(flockDscMatch != 0)
  {
    this.children.flexLayout1.children.textBox1.backgroundColor = Color.WHITE;
    this.children.flexLayout1.children.textBox2.backgroundColor = Color.GREEN;
    alertView1.title = "Flock Description Warning";
    alertView1.message = "Flock Description is already exist, Do you wish to continue ?";
    alertView1.addButton({
      index: AlertView.ButtonType.NEGATIVE,
      text: "Change",
    });
    
    alertView1.addButton({
      index: AlertView.ButtonType.POSITIVE,
      text: "Okay",
      onClick: function(){
        database.execute("INSERT INTO 'F64PL001' ('ZXFLOCKID','ZXFLOCKDSC1','FARMCODE') VALUES ('" + flockId + "' , '" + flockDsc + "' , '" + newFarmcodeInteger + "' ) ");
        Router.goBack("feedItemMaster");
      }
    });
    alertView1.show();
  }
  
  if(flockIdMatch === 0 && flockDscMatch === 0)
  {
    database.execute("INSERT INTO 'F64PL001' ('ZXFLOCKID','ZXFLOCKDSC1','FARMCODE') VALUES ('" + flockId + "' , '" + flockDsc + "' , '" + newFarmcodeInteger + "'  ) ");
    Router.goBack("flockMasterPage");
  }
  //End Check
}
//End

function onShow(superOnShow) {
  text1 = 0;
  text2 = 0;
  this.children.flexLayout1.children.textBox1.text            = "..";
  this.children.flexLayout1.children.textBox2.text            = "..";
  this.children.flexLayout1.children.label4.text              = "..";
  this.children.flexLayout1.children.textBox1.backgroundColor = Color.WHITE;
  this.children.flexLayout1.children.textBox2.backgroundColor = Color.WHITE;
  superOnShow();
}

function onLoad(superOnLoad) {
  superOnLoad();
}

module && (module.exports = AddFlockPage);