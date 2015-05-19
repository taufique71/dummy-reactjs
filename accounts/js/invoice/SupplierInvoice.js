
var React = require("react") ;


var SupplierInvoice = React.createClass({
  getInitialState: function(){
    var data_temp = {
      'date' : "",
      'number' : "",
      'amount_total' : 0,
      'customer' : '',
      'products' : [] ,
    }
    return ({
      data : data_temp,
      pay_button_class : "btn btn-danger text-center visible",
    }) ;
  },
  

  componentDidMount: function(){
    var postData = {
      "id" : (this.context.router.getCurrentParams().invoiceId)
    }; 

        $.ajax({
            url: config.accounts.base_url + "/accounts/v1/get_supplier_invoice",
            data:  JSON.stringify(postData) ,
            dataType: 'json',
            method: 'POST',
            success: function(data) {
              
              if(data.state === 'open'){
                
                this.setState({pay_button_class : "btn btn-danger text-center visible"});
                $('#pay_button').attr('disabled', false) ;
              }else{
                this.setState({pay_button_class : "btn btn-primary text-center visible"});
                $('#pay_button').attr('disabled', true) ;

              }
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("this ", status, err.toString());
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
  handlePayClick: function(){
    var postData = {
      "id" : (this.context.router.getCurrentParams().invoiceId)
    }; 

        $.ajax({
            url: config.accounts.base_url + "/accounts/v1/supplier_pay",
            data:  JSON.stringify(postData) ,
            dataType: 'json',
            method: 'POST',
            success: function(data) {

              if(data.state === 'open'){
                this.setState({pay_button_class : "btn btn-danger text-center visible"});
                $('#pay_button').attr('disabled', false) ;
              }else{
                this.setState({pay_button_class : "btn btn-primary text-center visible"});
                $('#pay_button').attr('disabled', true) ;

              }
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("this ", status, err.toString());
            }.bind(this)
        });
  },
  

  render : function(){
    
    return (
      <div className = "invoiceDiv">
        <div className = "panel panel-default text-center" >
          <div className = "panel-heading"> Invoice Control </div>
          <div className = "panel-body"> 
            <button className = {this.state.pay_button_class} id = "pay_button" onClick = {this.handlePayClick} > Pay </button>
            <button className = "btn btn-warning text-center" onClick = {this.printInvoice} > Print Invoice </button>
          </div>
        </div>
        <br />
        <br />



        <div className = "box"> 
          <div className = "pdf">
            <link href="css/app.css" rel="stylesheet" />
            <link href="./bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
            <h1> Mukto Medical </h1>
            <p> Uttar Badda</p>
            <br />
            <br />

            <h2>Supplier Invoice  : {this.state.data.number} </h2>
            <br />
            <div>
              <strong> Date: </strong>  {this.state.data.date}
              
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
      
        var rows = this.props.data.map(function(row) {
          
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

module.exports = SupplierInvoice ;