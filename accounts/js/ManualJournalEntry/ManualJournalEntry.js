
var React = require('react');

var ManualJournalEntry = React.createClass({
  getInitialState : function(){
    return ({
      data :{
        "journal" : "" ,
        "period"  : "" ,
        "reference" : "",
        "date" : "" ,
        'data' : [] ,
      },

      temp : {
        "name" : "" ,
        "partner" : "" ,
        "account" : "" ,
        "debit" : "" ,
        "credit" : ""
      },

      journal : [] ,
      account : [] ,
      partner : [] ,

    });
  },

  handleChange : function(){
    var data = this.state.temp ;
    data[event.target.name] = event.target.value ;
  },
  handleDataChange : function(){
    var data = this.state.data ;
    data[event.target.name] = event.target.value ;
  },
  handleJournalChange: function(evt){
    var data = this.state.data ;
    data['journal'] = evt.target.value ;
    console.log("JOURNAL " + JSON.stringify(data)) ;
  },

  handleAccountChange: function(evt){
    var data = this.state.temp ;
    data['account'] = evt.target.value ;
    console.log("ACC " + JSON.stringify(data)) ;
  },
  handlePartnerChange: function(evt){
    var data = this.state.temp ;
    data['partner'] = evt.target.value ;
    console.log("Partner " + JSON.stringify(data)) ;
  },

  handleAdd : function(){
    var data = this.state.data.data ;
    var addData = {
      'No' : this.state.data.data.length  + 1 ,
      'Name' : this.state.temp.name ,
      'Partner' : this.state.temp.partner ,
      'Account' : this.state.temp.account ,
      'Debit' : this.state.temp.debit,
      'Credit' : this.state.temp.credit,
    };

    data.push(addData) ;
    var mData = this.state.data ;
    mData['data'] =  data ;
    console.log(JSON.stringify(mData)) ;
    this.setState({data : mData}) ;
  },

  handleSubmit : function(){
    alert("HEY") ;
    alert(JSON.stringify(this.state.data)) ;
    $.ajax({
      url: config.accounts.base_url + "/accounts/v1/create_manual_journal_enty" ,
      data: JSON.stringify(this.state.data) ,
      method : "POST" ,
      success: function(data){
        alert("THANK YOU") ;
      }.bind(this) ,
      error: function(xhr , status , err){
        console.error("this " , status , err.toString()) ;
      }.bind(this)
    }); 
  },

  componentDidMount: function(){
    $.ajax({
      url: config.accounts.base_url + "/accounts/v1/get_acc_jour" ,
      method : "GET",
      success: function(data){
        
        if(data.journal.length > 0){
          var dd  = this.state.data ;
          dd['journal'] = data.journal[0].id ;

        }
        if(data.account.length > 0){
          var dd  = this.state.data ;
          dd['accounts'] = data.account[0].id ;

        }

        if(data.partner.length > 0){
          var dd  = this.state.data ;
          dd['partner'] = data.partner[0].id ;

        }

        this.setState({journal : data.journal}) ;
        this.setState({account : data.account}) ;
        this.setState({partner : data.partner}) ;

      }.bind(this) ,
      error: function(xhr , status , err){
        console.error("this " , status , err.toString()) ;
      }.bind(this)
    });

  },

  render : function(){
    return (
      <div>
        
        <div className = "panel panel-default text-center" >
              <div className = "panel-body"> 
                
              </div>
            </div>

            <br />
            <br />

            <div className = "form-horizontal">
              
              <div className = "form-group">
                <label className = "col-sm-2 control-label"> Journal </label>
                <div className = "col-sm-4">
                  <JournalSelect data = { this.state.journal } onChange = {this.handleJournalChange} />

                </div>
              </div>

              <div className = "form-group">
                <label className = "col-sm-2 control-label"> Period </label>
                <div className = "col-sm-4">
                  <input className = "form-control" name = "period"  onChange = {this.handleDataChange} id = "period" placeholder = "Period"/>
                </div>
              </div>

              <div className = "form-group">
                <label className = "col-sm-2 control-label"> Reference </label>
                <div className = "col-sm-4">
                  <input className = "form-control" name = "reference"  onChange = {this.handleDataChange} id = "reference" placeholder = "Reference"/>
                </div>
              </div>

              <div className = "form-group">
                <label className = "col-sm-2 control-label"> Date </label>
                <div className = "col-sm-4">
                  <input className = "form-control" name = "date" onChange = {this.handleDataChange}  id = "date" placeholder = "Date"/>
                </div>
              </div>

              <hr />

              <Table data = {this.state.data.data} />



              <hr />

              <div className = "form-group">
                <label className = "col-sm-2 control-label"> Name </label>
                <div className = "col-sm-4">
                  <input className = "form-control" name = "name"  onChange = {this.handleChange} id = "name" placeholder = "Name"/>
                </div>
              </div>

              <div className = "form-group">
                <label className = "col-sm-2 control-label"> Partner </label>
                <div className = "col-sm-4">
                  <PartnerSelect data = { this.state.partner } onChange = {this.handlePartnerChange} />
                </div>
              </div>

              <div className = "form-group">
                <label className = "col-sm-2 control-label"> Account </label>
                <div className = "col-sm-4">
                  <AccountSelect data = { this.state.account } onChange = {this.handleAccountChange} />
                </div>
              </div>

              <div className = "form-group">
                <label className = "col-sm-2 control-label"> Debit </label>
                <div className = "col-sm-4">
                  <input className = "form-control" name = "debit"  onChange = {this.handleChange} id = "debit" placeholder = "Debit"/>
                </div>
              </div>

              <div className = "form-group">
                <label className = "col-sm-2 control-label"> Credit </label>
                <div className = "col-sm-4">
                  <input className = "form-control" name = "credit" onChange = {this.handleChange} id = "credit" placeholder = "Credit"/>
                </div>
              </div>
              <div className = "col-sm-offset-2">
                <button className = "btn btn-primary" onClick = {this.handleAdd}> Add </button>
                 &nbsp; 
                <button className = "btn btn-primary" onClick = {this.handleSubmit}> Submit </button>
              </div>
            </div>


        </div>              

    ) ;
  }
}) ;



var JournalSelect = React.createClass({
  getInitialState : function(){
    return ({
      options: [] 
    });
  },
  render : function(){
    var data = this.props.data ;
    while(this.state.options.length > 0) {
        this.state.options.pop();
    }
    for(var i = 0 ; i < data.length ; i++){
      this.state.options.push(
        <option key = {i} value = {data[i].id} > { data[i].code} - {data[i].name} </option>
      );
      // this.forceUpdate() ;
    }


    return (
      <select className = "form-control" onChange = {this.props.onChange} > {this.state.options} </select>
    );
  }
});


var AccountSelect = React.createClass({
  getInitialState : function(){
    return ({
      options: [] 
    });
  },
  render : function(){
    var data = this.props.data ;
    while(this.state.options.length > 0) {
        this.state.options.pop();
    }
    for(var i = 0 ; i < data.length ; i++){
      this.state.options.push(
        <option key = {i} value = {data[i].id} >{data[i].code} - {data[i].name} </option>
      );
      // this.forceUpdate() ;
    }


    return (
      <select className = "form-control" onChange = {this.props.onChange} > {this.state.options} </select>
    );
  }
});


var PartnerSelect = React.createClass({
  getInitialState : function(){
    return ({
      options: [] 
    });
  },
  render : function(){
    var data = this.props.data ;
    while(this.state.options.length > 0) {
        this.state.options.pop();
    }
    for(var i = 0 ; i < data.length ; i++){
      this.state.options.push(
        <option key = {i} value = {data[i].id} >  {data[i].name} </option>
      );
      // this.forceUpdate() ;
    }


    return (
      <select className = "form-control" onChange = {this.props.onChange} > {this.state.options} </select>
    );
  }
});




var Table = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    
    render: function() {
      
        return (
            <table className="table table-striped table-bordered table-hover">
                <TableHeader data={this.props.data}  />
                <TableBody data={this.props.data} />
            </table>
        );
    }

});


var TableHeader = React.createClass({
    render: function() {
        var headerRow;
        if(this.props.data.length > 0) {
            headerRow = Object.keys(this.props.data[0]).map(function (col) {
                return (
                    <th>{col}</th>
                    );
            });
        }
        else
            headerRow = ""

        return (
            <thead>
                <tr>
                    {headerRow}
                </tr>
            </thead>
        );
  }
});





var TableRow = React.createClass({
    render: function() {
        var rowData = this.props.data;
        var singleRow = Object.keys(rowData).map(function(key) {
          return (
              <td>{rowData[key]}</td>
          );
        });
        return (
            <tr>
                {singleRow}
            </tr>
        );
    }
});

var TableBody = React.createClass({
    render: function() {
      // console.log("BODY: " + JSON.stringify(this.props.data) ) ;
        var rows = this.props.data.map(function(row) {
          // console.log("ROW : " + row) ;
            return (
                <TableRow data={row} />
            );
        });
        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
});


module.exports = ManualJournalEntry ;