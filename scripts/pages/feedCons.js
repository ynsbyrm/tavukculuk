const extend                = require('js-base/core/extend');
const FeedConsDesign        = require('ui/ui_feedCons');
const HeaderBarItem         = require('sf-core/ui/headerbaritem');
const Router                = require('sf-core/router');
const Database              = require('sf-core/data').Database;
const Path                  = require('sf-core/io/path');
const File                  = require('sf-core/io/file');
const ListViewItem          = require('sf-core/ui/listviewitem');
const Label                 = require('sf-core/ui/label');
const FlexLayout            = require('sf-core/ui/flexlayout');
const Color                 = require('sf-core/ui/color');
const Menu                  = require('sf-core/ui/menu');
const MenuItem              = require('sf-core/ui/menuitem');
const DatePicker            = require('sf-core/ui/datepicker');
const System                = require('sf-core/device/system');

const FeedCons = extend(FeedConsDesign)(
  // Start superFunction 
  function(_super) {
    _super(this);
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    // Create headerBar right item and define onPress event
    var myItem = new HeaderBarItem({title: "Feed Animals", onPress: function() { Router.go("feedAnimalsPage");}    });
    this.headerBar.title = "";
    this.headerBar.setItems([myItem]);
    this.children.flexLayout1.children.flexLayout2.children.searchButton.onPress    = searchButton_onPress.bind(this);
    this.children.flexLayout1.children.flexLayout2.children.farmLabel.onTouch       = farmLabel_onTouch.bind(this);
    this.children.flexLayout1.children.flexLayout2.children.flockLabel.onTouch      = flockLabel_onTouch.bind(this);
    this.children.flexLayout1.children.flexLayout2.children.startDateLabel.onTouch  = startDateLabel_onTouch.bind(this);
    this.children.flexLayout1.children.flexLayout2.children.endDateLabel.onTouch    = endDateLabel_onTouch.bind(this);
  // end superFunction
  });
  
//Create DB on Local
var database   = new Database({
    file: new File({path:  Path.DataDirectory + "//tavukculuk.sqlite" })
  });
//end

// farmLabel onTouch event
var page;
var returnValue;
var returnFarmcode = 0;
function farmLabel_onTouch(){
  page = this;
  this.children.flexLayout1.children.flexLayout2.children.farmLabel.text = "..";
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
  page.children.flexLayout1.children.flexLayout2.children.farmLabel.text = returnValue;
}
//End

// flockLabel onTouch event
var returnValue1;
var returnFlockId = 0;
function flockLabel_onTouch(){
  this.children.flexLayout1.children.flexLayout2.children.flockLabel.text = "..";
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
  page.children.flexLayout1.children.flexLayout2.children.flockLabel.text = returnValue1;
}
//End

var definedStartDate = "";
var returnStartDay1 = "0";
var returnStartMonth1 = "0";
var returnStartDate1 = "";
var returnStartDate  = 0;
// dateLabel onTouch event
function startDateLabel_onTouch(){
  page = this;
  definedStartDate = "";
  returnStartDay1 = "0";
  returnStartMonth1 = "0";
  returnStartDate1 = "";
  returnStartDate  = 0;
  //Create Datepicker
  var myDatePicker = new DatePicker();
  myDatePicker.onDateSelected = function(date){
    definedStartDate = "";
    var day   = date.getDate();
    var newDay = "0";
    var month = date.getMonth()+1;
    var newMonth = "0";
    var year  = date.getFullYear();
    if(day < 10)
    {
      newDay += day;
      returnStartDay1 += day;
    }
    else
    {
      newDay = day;
      returnStartDay1 = day;
    }
    if(month < 10)
    {
      newMonth += month;
      returnStartMonth1 += month;
    }
    else
    {
      newMonth = month;
      returnStartMonth1 = month;
    }
    definedStartDate = newDay + "." + newMonth + "." + year;
    returnStartDate1 += year + returnStartMonth1 + returnStartDay1;
    returnStartDate = returnStartDate1;
    myDatePicker_startDateSelected(page);
  };
  myDatePicker.show();
}
// End

// This function will call when Datepicker on selected
function myDatePicker_startDateSelected(page){
  page.children.flexLayout1.children.flexLayout2.children.startDateLabel.text = definedStartDate;
}
// End

var definedEndDate = "";
var returnEndDay1 = "0";
var returnEndMonth1 = "0";
var returnEndDate1 = "";
var returnEndDate  = 0;
// dateLabel onTouch event
function endDateLabel_onTouch(){
  page = this;
  definedEndDate = "";
  returnEndDay1 = "0";
  returnEndMonth1 = "0";
  returnEndDate1 = "";
  returnEndDate  = 0;
  //Create Datepicker
  var myDatePicker = new DatePicker();
  myDatePicker.onDateSelected = function(date){
    definedEndDate = "";
    var day   = date.getDate();
    var newDay = "0";
    var month = date.getMonth()+1;
    var newMonth = "0";
    var year  = date.getFullYear();
    if(day < 10)
    {
      newDay += day;
      returnEndDay1 += day;
    }
    else
    {
      newDay = day;
      returnEndDay1 = day;
    }
    if(month < 10)
    {
      newMonth += month;
      returnEndMonth1 += month;
    }
    else
    {
      newMonth = month;
      returnEndMonth1 = month;
    }
    definedEndDate = newDay + "." + newMonth + "." + year;
    returnEndDate1 += year + returnEndMonth1 + returnEndDay1;
    returnEndDate = returnEndDate1;
    myDatePicker_endDateSelected(page);
  };
  myDatePicker.show();
}
// End

// This function will call when Datepicker on selected
function myDatePicker_endDateSelected(page){
  page.children.flexLayout1.children.flexLayout2.children.endDateLabel.text = definedEndDate;
}
// End

function searchButton_onPress(){
  if(System.OS == "Android")
  {
    //Bind listView on .pgx
    var myListView = this.children.flexLayout1.children.listView1;
    //Define dataSet
    var myDataSet = [{}];
    var menuItem1 = ({flock : "bos", farmcode : "bos", date : "bos", feeditem : "bos", quantity : "bos", uom : "bos"});
    myDataSet[0] = menuItem1;
    listView(myListView, myDataSet);
    
    var farm = this.children.flexLayout1.children.flexLayout2.children.farmLabel.text;
    var flockNew = this.children.flexLayout1.children.flexLayout2.children.flockLabel.text;
    var start = this.children.flexLayout1.children.flexLayout2.children.startDateLabel.text;
    var end = this.children.flexLayout1.children.flexLayout2.children.endDateLabel.text;
    
    if(farm == "..")
    {
      returnFarmcode = "";
    }
    if(flockNew == "..")
    {
      returnFlockId = "";
    }
    if(end == "..")
    {
      returnEndDate = 30000000;
    }
    if(start == "..")
    {
      returnStartDate = 100;
    }

    //Create DB on Local
    var database   = new Database({
        file: new File({path:  Path.DataDirectory + "//tavukculuk.sqlite" })
      });
      
    //Get query Result and values with Filters
    returnStartDate--;
    returnEndDate++;
    var result      = database.query("SELECT * FROM 'FEEDCONS' WHERE (DATE > '"+returnStartDate+"') AND (DATE < '"+returnEndDate+"') AND (FARMCODE LIKE'"+returnFarmcode+"%') AND (ZXFLOCKID LIKE '"+returnFlockId+"%')  ");
    var tempResult;
    
    for(var j=0; j < result.count() ; j++)
    {
      
      var flock     = result.get(j).getInteger('ZXFLOCKID');
      tempResult    = database.query("SELECT * FROM 'F64PL001' WHERE ZXFLOCKID LIKE '" + flock +"%'  ");
      flock         = tempResult.get(0).getString('ZXFLOCKDSC1');
      var farmcode  = result.get(j).getInteger('FARMCODE');
      tempResult    = database.query("SELECT * FROM 'F40601' WHERE FARMCODE LIKE '" + farmcode +"%'  ");
      farmcode      = tempResult.get(0).getString('FARMNAME');
      var date      = result.get(j).getInteger('DATE');
      var datestring = "";
      datestring    = date.toString();
      var reverseDate = "";
      reverseDate += datestring.substring(6,8);
      reverseDate += ".";
      reverseDate += datestring.substring(4,6);
      reverseDate += ".";
      reverseDate += datestring.substring(0,4);
      var feeditem  = result.get(j).getInteger('LITM');
      tempResult    = database.query("SELECT * FROM 'F4101' WHERE LITM LIKE '" + feeditem +"%'  ");
      feeditem      = tempResult.get(0).getString('DSC1');
      var quantity  = result.get(j).getInteger('QTY');
      var uom       = result.get(j).getString('UOM');
      var menuItem1 = ({flock : flock, farmcode : farmcode, date : reverseDate, feeditem : feeditem, quantity : quantity, uom : uom});
      myDataSet[j]  = menuItem1;
    }
    
    if(myDataSet[0].flock != null)
    {
      listView(myListView, myDataSet);
    }
  }
}

//Create listView and define all events
function listView(myListView, myDataSet){
  myListView.itemCount = myDataSet.length;
  //Define onRowCreate event
  myListView.onRowCreate = function() {
    var myListViewItem   = new ListViewItem();
    var myFlexLayout     = new FlexLayout({
      id: 103,
      height: 80,
      borderWidth: 1,
      borderRadius: 10,
      justifyContent: FlexLayout.JustifyContent.SPACE_AROUND,
    });
    myListViewItem.addChild(myFlexLayout);
    
    var myLabel1 = new Label({
      id:104,
      text: "first",
      visible: true,
      height: 38,
      backgroundColor: Color.GRAY,
    });
    myLabel1.top = 1;
    myFlexLayout.addChild(myLabel1);
    
    var myLabel2 = new Label({
      id: 105,
      text: "second",
      visible: true,
      height: 38,
    });
    myLabel1.bottom = 1;
    myFlexLayout.addChild(myLabel2);
    
    return myListViewItem;
  };
        
  //Define onRowBind event
  myListView.onRowBind = function(listViewItem, index) {
    //1. title
      var myLabelTitle1 = listViewItem.findChildById(103);
      var yeni = myLabelTitle1.findChildById(104);
      var titleDegeri = " Date:";
      titleDegeri += myDataSet[index].date;
      titleDegeri += "        Farm:";
      titleDegeri += myDataSet[index].farmcode;
      yeni.text    = titleDegeri;
      //2. title
      yeni = myLabelTitle1.findChildById(105);
      titleDegeri = " Flock:";
      titleDegeri += myDataSet[index].flock;
      titleDegeri += "        Feed Item:";
      titleDegeri += myDataSet[index].feeditem;
      yeni.text    = titleDegeri;
  };
        
  //Define onRowSelected event
  myListView.onRowSelected = function(listViewItem, index) {
      alert("selected index = " + index);
  };
  
  //Define onPullRefresh event
  myListView.onPullRefresh = function() {
      myListView.itemCount = myDataSet.length;
      myListView.refreshData();
      myListView.stopRefresh();
  };
//End listView
}

//This Function run every single time when page show.
function onShow(superOnShow) {
  this.children.flexLayout1.children.flexLayout2.children.farmLabel.text = "..";
  this.children.flexLayout1.children.flexLayout2.children.flockLabel.text = "..";
  this.children.flexLayout1.children.flexLayout2.children.startDateLabel.text = "..";
  this.children.flexLayout1.children.flexLayout2.children.endDateLabel.text = "..";
  
  if(System.OS != "Android")
  {
    this.children.flexLayout1.children.flexLayout2.children.searchButton.visible = false;
    var farm = this.children.flexLayout1.children.flexLayout2.children.farmLabel.text;
    var flockNew = this.children.flexLayout1.children.flexLayout2.children.flockLabel.text;
    var start = this.children.flexLayout1.children.flexLayout2.children.startDateLabel.text;
    var end = this.children.flexLayout1.children.flexLayout2.children.endDateLabel.text;
    
    if(farm == "..")
    {
      returnFarmcode = "";
    }
    if(flockNew == "..")
    {
      returnFlockId = "";
    }
    if(end == "..")
    {
      returnEndDate = 30000000;
    }
    if(start == "..")
    {
      returnStartDate = 0;
    }
  
    //Bind listView on .pgx
    var myListView = this.children.flexLayout1.children.listView1;
    //Create DB on Local
    var database   = new Database({
        file: new File({path:  Path.DataDirectory + "//tavukculuk.sqlite" })
      });
    
    //Define dataSet
    var myDataSet   = [{}];
    //Get query Result and values with Filters
    var result      = database.query("SELECT * FROM 'FEEDCONS' WHERE (DATE > '"+returnStartDate+"') AND (DATE < '"+returnEndDate+"') AND (FARMCODE LIKE'"+returnFarmcode+"%') AND (ZXFLOCKID LIKE '"+returnFlockId+"%')  ");
    var tempResult;
    
    for(var j=0; j < result.count() ; j++)
    {
      
      var flock     = result.get(j).getInteger('ZXFLOCKID');
      tempResult    = database.query("SELECT * FROM 'F64PL001' WHERE ZXFLOCKID LIKE '" + flock +"%'  ");
      flock         = tempResult.get(0).getString('ZXFLOCKDSC1');
      var farmcode  = result.get(j).getInteger('FARMCODE');
      tempResult    = database.query("SELECT * FROM 'F40601' WHERE FARMCODE LIKE '" + farmcode +"%'  ");
      farmcode      = tempResult.get(0).getString('FARMNAME');
      var date      = result.get(j).getInteger('DATE');
      var datestring = "";
      datestring    = date.toString();
      var reverseDate = "";
      reverseDate += datestring.substring(6,8);
      reverseDate += ".";
      reverseDate += datestring.substring(4,6);
      reverseDate += ".";
      reverseDate += datestring.substring(0,4);
      var feeditem  = result.get(j).getInteger('LITM');
      tempResult    = database.query("SELECT * FROM 'F4101' WHERE LITM LIKE '" + feeditem +"%'  ");
      feeditem      = tempResult.get(0).getString('DSC1');
      var quantity  = result.get(j).getInteger('QTY');
      var uom       = result.get(j).getString('UOM');
      var menuItem1 = ({flock : flock, farmcode : farmcode, date : reverseDate, feeditem : feeditem, quantity : quantity, uom : uom});
      myDataSet[j]  = menuItem1;
    }
    
    if(myDataSet[0].flock != null)
    {
      listView(myListView, myDataSet);
    }
  }
  superOnShow();
//End onShow Function
}

//This Function NOT run everytime when page show on "Android"
//BUT it run everytime when page show on "IOS"
function onLoad(superOnLoad) {
  superOnLoad();
}

module && (module.exports = FeedCons);