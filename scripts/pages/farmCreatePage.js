const extend                = require('js-base/core/extend');
const FarmCreatePageDesign  = require('ui/ui_farmCreatePage');
const Database              = require('sf-core/data').Database;
const Path                  = require('sf-core/io/path');
const File                  = require('sf-core/io/file');
const AlertView             = require('sf-core/ui/alertview');
const Color                 = require('sf-core/ui/color');
const Router                = require("sf-core/ui/router");
const HeaderBarItem         = require('sf-core/ui/headerbaritem');

const FarmCreatePage = extend(FarmCreatePageDesign)(
  // Start superFunction
  function(_super) {
    _super(this);
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    //bind buttons and textbox events to functions
    this.children.flexLayout1.children.flexLayout2.children.textBox1.onTouch = textBox1onTouch.bind(this);
    this.children.flexLayout1.children.flexLayout2.children.textBox2.onTouch = textBox2onTouch.bind(this);
    this.children.flexLayout1.children.addFarmButton.onPress = addFarmButton_onPress.bind(this);
    //Create Headerbar right item and define onPress event
    var myItem = new HeaderBarItem({
      title: "Save",
    });
    this.headerBar.title = "";
    this.headerBar.setItems([myItem]);
    myItem.onPress = addFarmButton_onPress.bind(this);
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
    this.children.flexLayout1.children.flexLayout2.children.textBox1.text = "";
    text1++;
  }
}
// End

// Textbox2 onTouch event
var text2 = 0;
function textBox2onTouch(){
  if(text2 == 0)
  {
    this.children.flexLayout1.children.flexLayout2.children.textBox2.text = "";
    text2++;
  }
}
//End

// Alertview for Farmcode Start
var alertView1 = new AlertView({
  title: "Farmcode Error",
  message: "Farmcode is already exist. Please check it",
});
//end

// Save farm button and Headerbar right item on press event Start
function addFarmButton_onPress(){
  this.children.flexLayout1.children.flexLayout2.children.textBox1.removeFocus();
  this.children.flexLayout1.children.flexLayout2.children.textBox2.removeFocus();
  var fcodeMatch = 0;
  var fnameMatch = 0;
  var fcode = this.children.flexLayout1.children.flexLayout2.children.textBox1.text;
  var fname = this.children.flexLayout1.children.flexLayout2.children.textBox2.text;
  var result = database.query("SELECT * FROM 'F40601'");
  for(var i=0; i<result.count(); i++)
  {
    var gelenCode = result.get(i).getInteger('FARMCODE');
    var gelenName = result.get(i).getString('FARMNAME');
    if(fcode == gelenCode)
    {
      fcodeMatch++;
    }
    if(fname == gelenName)
    {
      fnameMatch++;
    }
  }
  // Check Farmcode is unique or not
  if(fcodeMatch === 0 && fnameMatch === 0)
  {
    
    database.execute("INSERT INTO 'F40601' ('FARMCODE','FARMNAME') VALUES ('" + fcode + "' , '" + fname + "' ) ");
    Router.goBack("farmMasterPage");
  }
  else if(fcodeMatch != 0)
  {
    this.children.flexLayout1.children.flexLayout2.children.textBox1.backgroundColor = Color.RED;
    alertView1.title  = "Farmcode Error";
    alertView1.message = "Farmcode is already exist. Please check it";
    alert(alertView1);
  }
  else if(fnameMatch != 0)
  {
    this.children.flexLayout1.children.flexLayout2.children.textBox1.backgroundColor = Color.WHITE;
    this.children.flexLayout1.children.flexLayout2.children.textBox2.backgroundColor = Color.GREEN;
    alertView1.title = "Farmname Error";
    alertView1.message = "Farmname already exist, Do you wish to continue ?";
    alertView1.addButton({
      index: AlertView.ButtonType.NEGATIVE,
      text: "Change",
    });
    
    alertView1.addButton({
      index: AlertView.ButtonType.POSITIVE,
      text: "Okay",
      onClick: function(){
        database.execute("INSERT INTO 'F40601' ('FARMCODE','FARMNAME') VALUES ('" + fcode + "' , '" + fname + "' ) ");
        Router.goBack("farmMasterPage");
      }
    });
    alertView1.show();
  }
}
//end

//This Function run every single time when page show.
function onShow(superOnShow) {
  text1 = 0;
  text2 = 0;
  this.children.flexLayout1.children.flexLayout2.children.textBox1.text = "..";
  this.children.flexLayout1.children.flexLayout2.children.textBox2.text = "..";
  this.children.flexLayout1.children.flexLayout2.children.textBox1.backgroundColor = Color.WHITE;
  this.children.flexLayout1.children.flexLayout2.children.textBox2.backgroundColor = Color.WHITE;
  superOnShow();
}

function onLoad(superOnLoad) {
  superOnLoad();
}
module && (module.exports = FarmCreatePage);