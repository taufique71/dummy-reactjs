
var React = require("react") ;

var Invoice = React.createClass({
  getInitialState: function(){
    var data_temp = {
      'date' : "",
      'number' : "",
      'amount_total' : 0 ,
      'customer' : '',
      'products' : [] ,
    }
    return ({data : data_temp}) ;
  },
  

  componentDidMount: function(){
    var postData = {
      "id" : (this.context.router.getCurrentParams().invoiceId)
    }; 

        $.ajax({
            url: config.accounts.base_url + "/accounts/v1/get_invoice",
            data:  JSON.stringify(postData) ,
            dataType: 'json',
            method: 'POST',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("thisa", status, err.toString());
            }.bind(this)
        });
  },

  contextTypes:{
    router : React.PropTypes.func
  },


  printInvoice: function(){
    
    var pdf = new jsPDF();
    var x = $(".pdf").html() ;
    // alert("X: " + x) ;
    pdf.fromHTML( x ) ;
    
    pdf.save("Invoice.pdf") ; 

  },

  
  

  render : function(){
    
    return (
      <div className = "invoiceDiv">
        <div className = "panel panel-default text-center" >
          <div className = "panel-heading"> Invoice Control </div>
          <div className = "panel-body"> 
            <button className = "btn btn-warning text-center" onClick = {this.printInvoice}> Print Invoice </button>
            &nbsp;
            <button className = "btn btn-primary text-center" data-toggle="modal" data-target="#myModal" > Refund </button>
          </div>
        </div>
        <br />
        <br />

        <SalesRefundModal id = {this.context.router.getCurrentParams().invoiceId} amount = {this.state.data.amount_total} />


        <div className = "box"> 
          <div className = "pdf">
            <link href="css/app.css" rel="stylesheet" />
            <link href="./bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
            <h1> Mukto Medical </h1>
            <p> Uttar Badda</p>
            <br />
            <br />

            <h2>Invoice : {this.state.data.number} </h2>
            <br />
            <div>
              <strong>Invoice Date: </strong>  {this.state.data.date}
              
              <br />
            </div>
            
            <br />
            <br />
            <h3> Customer : {this.state.data.customer} </h3>

            <br />
            <br />


            <ITable data = {this.state.data.products} />
            <br />
            <br />


            <h3 >TOTAL : {this.state.data.amount_total} </h3>

          </div>
        </div>
      </div>
    );
  }
});


module.exports = Invoice ;





var ITable = React.createClass({
    getInitialState: function() {
        return {data: [
          {
            'product_id': [26, 'asdf'], 
            'price_unit': 211.0, 
            'price_subtotal': 25531.0, 
            'name': 'asdf', 
            'id': 136, 
            'quantity': 121.0
          }
        ]};
    },
    componentDidMount: function() {
      if(this.props.url)
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

      
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





var SalesRefundModal = React.createClass({
  getInitialState: function(){
    return ({
      reason : "",
      amount : this.props.amount,
      date : ""
    })
  },
  
  componentWillReceiveProps: function(nextProp){
    this.setState({amount : nextProp.amount}) ;
  },
  
  createRefund: function(){
    var postData = {
      "id" : this.props.id ,    
      "reason" : this.state.reason , 
      "amount" : this.state.amount ,
      "date" : this.state.date ,
    } ;

    
    
    $.ajax({
            url: config.accounts.base_url + '/accounts/v1/customer_refund',
            dataType: 'json',
            data: JSON.stringify(postData),
            method: 'POST',
            success: function(data) {
              alert("Paid") ;
              this.setState({ reason : "" , date : "" });
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({ reason : "" , date : "" });
               
                alert("OH! NO!");

            }.bind(this)
        });
  },
  
  handleReasonChange: function(){
    var reasonValue = event.target.value ;
    this.setState({reason : reasonValue});
  },
  handleDateChange: function(){
    var date = event.target.value ;
    this.setState({date : date});
  },
  handleAmountChange: function(){
    var amount = event.target.value ;
    this.setState({amount : amount});
  },


  render: function(){ 
    return (
      <div className = "modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> 
        <div className = "modal-dialog"> 
          <div className = "modal-content">
            
            <div className = "modal-header">
              <button className = "close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className = "modal-title"> Customer Refund </h4>
            </div>

            <div className = "modal-body">          
              
              <form className = "form-horizontal">
                <div className = "form-group">
                  <label className = "col-sm-2 control-label"> Date: </label>
                  <div className = "col-sm-10">
                    <input className = "form-control" name = "date" value = {this.state.date} onChange = {this.handleDateChange} placeholder = "Date" />
                  </div>
                </div>
                <div className = "form-group">
                  <label className = "col-sm-2 control-label"> Reason </label>
                  <div className = "col-sm-10">
                    <input className = "form-control" name = "product" value = {this.state.reason} onChange = {this.handleReasonChange} placeholder = "Reason" />
                  </div>
                </div>
                <div className = "form-group">
                  <label className = "col-sm-2 control-label"> Amount: </label>
                  <div className = "col-sm-10">
                    <input className = "form-control" name = "product" value = {this.state.amount} onChange = {this.handleAmountChange} placeholder = "Amount" />
                  </div>
                </div>
              </form>
            </div>

            <div className = "modal-footer">
              <button type="button" className = "btn btn-success" data-dismiss = "modal" onClick = {this.createRefund} > Submit </button>
              <button type="button" className = "btn btn-danger" data-dismiss="modal" > Close </button>
            </div>
          </div>  
        </div>
      </div>
    );
  }
});   
