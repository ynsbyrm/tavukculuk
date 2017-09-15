const extend                = require('js-base/core/extend');
const AddFeedItemPageDesign = require('ui/ui_addFeedItemPage');
const Database              = require('sf-core/data').Database;
const Path                  = require('sf-core/io/path');
const File                  = require('sf-core/io/file');
const AlertView             = require('sf-core/ui/alertview');
const Color                 = require('sf-core/ui/color');
const Router                = require("sf-core/ui/router");
const HeaderBarItem         = require('sf-core/ui/headerbaritem');

const AddFeedItemPage = extend(AddFeedItemPageDesign)(
  // Constructor
  function(_super) {
    // Start superFunction 
    _super(this);
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    //bind buttons and textbox events to functions

    this.children.flexLayout1.children.textBox1.onTouch = textBox1onTouch.bind(this);
    this.children.flexLayout1.children.textBox2.onTouch = textBox2onTouch.bind(this);
    this.children.flexLayout1.children.textBox3.onTouch = textBox3onTouch.bind(this);
    this.children.flexLayout1.children.textBox4.onTouch = textBox4onTouch.bind(this);
    this.children.flexLayout1.children.button1.onPress = addItem_onPress.bind(this);
    //Create Headerbar right item and define onPress event
    var myItem = new HeaderBarItem({
      title: "Save",
    });
    this.headerBar.title = "";
    this.headerBar.setItems([myItem]);
    myItem.onPress = addItem_onPress.bind(this);
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

// Textbox3 onTouch event
var text3 = 0;
function textBox3onTouch(){
  if(text3 == 0)
  {
    this.children.flexLayout1.children.textBox3.text = "";
    text3++;
  }
}
//End

// Textbox4 onTouch event
var text4 = 0;
function textBox4onTouch(){
  if(text4 == 0)
  {
    this.children.flexLayout1.children.textBox4.text = "";
    text4++;
  }
}
//End

// Alertview for Farmcode Start
var alertView1 = new AlertView({
  title: "Item No Error",
  message: "Item No is already exist. Please check it",
});
//end

//addItem_onPress event and headerbar right item onPress event start
function addItem_onPress(){
  
  this.children.flexLayout1.children.textBox1.removeFocus();
  this.children.flexLayout1.children.textBox2.removeFocus();
  this.children.flexLayout1.children.textBox3.removeFocus();
  this.children.flexLayout1.children.textBox4.removeFocus();
    
  var itemnoMatch = 0;
  var itemDescMatch = 0;
  var itemno = this.children.flexLayout1.children.textBox1.text;
  var itemdsc = this.children.flexLayout1.children.textBox2.text;
  var srp1 = this.children.flexLayout1.children.textBox3.text;
  var srp2 = this.children.flexLayout1.children.textBox4.text;
  var result = database.query("SELECT * FROM 'F4101'");
  for(var i=0; i<result.count(); i++)
  {
    var gelenItemNo = result.get(i).getInteger('LITM');
    var gelenItemDesc = result.get(i).getString('DSC1');
    if(itemno == gelenItemNo)
    {
      itemnoMatch++;
    }
    if(itemdsc == gelenItemDesc)
    {
      itemDescMatch++;
    }
  }
  
  //Check SRP1 and SRP2 length
  if(srp1.length > 3)
  {
    alertView1.title = "SRP1-2 length Error";
    alertView1.message = "SRP1 or SRP2 can't have more than 3 characters";
    alert(alertView1);
  }
  if(srp2.length > 3)
  {
    alertView1.title = "SRP1-2 length Error";
    alertView1.message = "SRP1 or SRP2 can't have more than 3 characters";
    alert(alertView1);
  }
  //Check LITM is unique or NOT?
  if(itemnoMatch != 0)
  {
    this.children.flexLayout1.children.textBox1.backgroundColor = Color.RED;
    alertView1.title  = "Item No Error";
    alertView1.message = "Item No is already exist. Please check it";
    alert(alertView1);
  }
  
  else if(itemDescMatch != 0)
  {
    this.children.flexLayout1.children.textBox1.backgroundColor = Color.WHITE;
    this.children.flexLayout1.children.textBox2.backgroundColor = Color.GREEN;
    alertView1.title = "Item Description Warning";
    alertView1.message = "Item Description is already exist, Do you wish to continue ?";
    alertView1.addButton({
      index: AlertView.ButtonType.NEGATIVE,
      text: "Change",
    });
    
    alertView1.addButton({
      index: AlertView.ButtonType.POSITIVE,
      text: "Okay",
      onClick: function(){
        database.execute("INSERT INTO 'F4101' ('LITM','DSC1','SRP1','SRP2') VALUES ('" + itemno + "' , '" + itemdsc + "' , '" + srp1 + "' , '" + srp2 + "'  ) ");
        Router.goBack("feedItemMaster");
      }
    });
    alertView1.show();
  }
  if(itemnoMatch === 0 && itemDescMatch === 0)
  {
    if(srp1.length < 4 && srp2.length < 4)
    {
      database.execute("INSERT INTO 'F4101' ('LITM','DSC1','SRP1','SRP2') VALUES ('" + itemno + "' , '" + itemdsc + "' , '" + srp1 +"' , '" + srp2 + "' ) ");
      Router.goBack("feedItemMaster");
    }
  }
  //End Check
}
//End

//This Function run every single time when page show.
function onShow(superOnShow) {
  text1 = 0;
  text2 = 0;
  text3 = 0;
  text4 = 0;
  this.children.flexLayout1.children.textBox1.text = "..";
  this.children.flexLayout1.children.textBox2.text = "..";
  this.children.flexLayout1.children.textBox3.text = "..";
  this.children.flexLayout1.children.textBox4.text = "..";
  this.children.flexLayout1.children.textBox1.backgroundColor = Color.WHITE;
  this.children.flexLayout1.children.textBox2.backgroundColor = Color.WHITE;
  superOnShow();
}

function onLoad(superOnLoad) {
  superOnLoad();
}

module && (module.exports = AddFeedItemPage);