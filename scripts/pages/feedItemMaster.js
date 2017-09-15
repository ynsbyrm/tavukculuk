const extend                = require('js-base/core/extend');
const FeedItemMasterDesign  = require('ui/ui_feedItemMaster');
const HeaderBarItem         = require('sf-core/ui/headerbaritem');
const Router                = require('sf-core/router');
const Database              = require('sf-core/data').Database;
const Path                  = require('sf-core/io/path');
const File                  = require('sf-core/io/file');
const ListViewItem          = require('sf-core/ui/listviewitem');
const Label                 = require('sf-core/ui/label');
const FlexLayout            = require('sf-core/ui/flexlayout');
const Color                 = require('sf-core/ui/color');

const FeedItemMaster = extend(FeedItemMasterDesign)(
  // Start superFunction 
  function(_super) {
    _super(this);
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    // Create headerBar right item and define onPress event
    var myItem = new HeaderBarItem({title: "Add Feed Item", onPress: function() { Router.go("addFeedItemPage");}    });
    this.headerBar.title = "";
    this.headerBar.setItems([myItem]);
  // end superFunction
  });

//Create listView and define all events
function listView(myListView, myDataSet){
  myListView.itemCount = myDataSet.length;
  //Define onRowCreate event
  myListView.onRowCreate = function() {
    var myListViewItem = new ListViewItem();
    var myFlexLayout = new FlexLayout({
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
      var titleDegeri = " Feed Itemno:";
      titleDegeri += myDataSet[index].litm;
      yeni.text = titleDegeri;
      //2. title
      yeni = myLabelTitle1.findChildById(105);
      titleDegeri = " Feed Item Desc. :";
      titleDegeri += myDataSet[index].dsc1;
      yeni.text = titleDegeri;
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
  //Bind listView on .pgx
  var myListView = this.children.listView1;
  //Create DB on Local
  var database = new Database({
      file: new File({path:  Path.DataDirectory + "//tavukculuk.sqlite" })
    });
  //Define dataSet
  var myDataSet = [{}];
  //Get query Result and values on columns
  var result = database.query("SELECT * FROM 'F4101'");
  for(var j=0; j < result.count(); j++)
  {
    var code = result.get(j).getInteger('LITM');
    var farmName = result.get(j).getString('DSC1');
    var farmName2 = result.get(j).getString('SRP1');
    var farmName3 = result.get(j).getString('SRP2');
    var menuItem1 = ({litm : code, dsc1 : farmName, srp1 : farmName2, srp2 : farmName3});
    myDataSet[j] = menuItem1;
  }
  
  if(myDataSet[0].litm != null)
  {
    listView(myListView, myDataSet);
  }
  superOnShow();
//End onShow Function
}

//This Function NOT run everytime when page show on "Android"
//BUT it run everytime when page show on "IOS"
function onLoad(superOnLoad) {
  superOnLoad();
}

module && (module.exports = FeedItemMaster);