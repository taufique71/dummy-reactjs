
var React = require("react") ;

var SalesReceiptForm = React.createClass({
  getInitialState: function(){
    return ({
      data: {
        customer : "",
        account  : "Sales Journal",
        reference: "",
        date : "",
        data : []
      },
      temp: {
        key : 1 ,
        product: "",
        unit : 1 ,
        pricePunit : 1,
        price : 1 
      },
      totalPrice : 0,
      del: 0 ,
      discount : 0 ,
      messageType: "bg-success",
      message: "" ,
    }) ;
  },
  handleClick: function(){

    console.log(this.state.temp) ;
    var temp = {
      "key" : (this.state.data.data.length+1),
      "product" : this.state.temp.product,
      "unit" : this.state.temp.unit,
      "pricePunit" : this.state.temp.pricePunit,
      "price" : (this.state.temp.unit * this.state.temp.pricePunit)
    } ;
    
    var newData = this.state.data.data ;
  
    if(temp.price == NaN) temp.price = 0 ;
    newData.push(temp) ;
  
    var parentState = this.state.data ;
    parentState.data = newData ;
    this.setState({data: parentState}) ;
  
    if(temp.price == NaN)temp.price = 0 ;
    this.setState({totalPrice : this.state.totalPrice + temp.price}) ;

    // console.log( "NEW" + JSON.stringify(this.state.data ) );

    

  },
  handleUpdate : function() {
    var temp = {
      "key" : parseInt(this.state.temp.key),
      "product" : this.state.temp.product,
      "unit" : this.state.temp.unit,
      "pricePunit" : this.state.temp.pricePunit,
      "price" : (this.state.temp.unit * this.state.temp.pricePunit)
    } ;


    var data = this.state.data.data ;
    if(this.state.totalPrice == NaN) this.setState({totalPrice:0}) ;
    var total = this.state.totalPrice ;
    for(var i = 0 ; i < data.length ; i++){
      if(data[i].key === temp.key){
        if(total > 0)total -= data[i].price ;
        data[i] = temp ;
        if(total == NaN)total = 0 ;
        total += this.state.totalPrice + temp.price ;
        break ;
      }
    }
      


    if(this.state.totalPrice == NaN) this.setState({totalPrice:0}) ;

    var parentState = this.state.data ;
    parentState.data = data ;
    this.setState({data: parentState}) ;
    this.setState({totalPrice : total}) ;


  },
  handleKeyChange: function() {
    var tmp = this.state.temp ;
    tmp.key = event.target.value ;
    this.setState({temp : tmp}) ;
  },
  handleProductChange: function(){
    var tmp = this.state.temp ;
    tmp.product = event.target.value ;
    this.setState({temp : tmp}) ;
  },
  handleUnitChange: function(){

    var tmp = this.state.temp ;         
    tmp.unit = event.target.value ;
    this.setState({temp : tmp}) ;
        
  },
  handlePPUnitChange: function(){
    var tmp = this.state.temp ;
    tmp.pricePunit = event.target.value ;
    this.setState({temp : tmp}) ;
  },
  handleDeleteChange: function(){   
    this.setState({del : event.target.value}) ;
  },
  handleDateChange: function(){
    var newData = this.state.data ;
    newData.date = event.target.value ;
    this.setState({data: newData}) ;

  },
  handleCustomerChange: function(){
    
    var newData = this.state.data ;
    newData.customer = event.target.value ;
    this.setState({data: newData}) ;



  },
  handleRefChange: function(){
    var newData = this.state.data ;
    newData.reference = event.target.value ;
    this.setState({data: newData}) ;

  },
  handleDiscountChange: function(){
    var disount = this.state.discount ;
    discount = event.target.value ;
    this.setState({discount : discount}) ;
    
  },
  handleSubmitClick: function(){

    var postData = {
      "customer" : this.state.data.customer,
      "reference" : this.state.data.reference,
      "date" : this.state.data.date,
      "product" : this.state.data.data,
      "total" : this.state.totalPrice,
      "discount" : this.state.discount ,
      
    } ;

    
    
    $.ajax({
            url: config.accounts.base_url + '/accounts/v1/create_order',
            dataType: 'json',
            data: JSON.stringify(postData),
            method: 'POST',
            success: function(data) {
                this.setState({
                  'messageType': 'bg-success', 
                  'message': 'New sales order created successfully'
                });
        
                window.location.href = "#/invoice/" + data['invoice_id'] ;
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({
                  'messageType': 'bg-danger', 
                  'message': err.toString()
                });
               
                alert("OH! NO!");
            }.bind(this)
        });
  },
  handleDelete: function(){
    
    if(!this.state.del){
      alert("Enter Product Number you want to delete.") ;
      return ;
    }

    var del = parseInt(this.state.del) ;


    var data = this.state.data.data ;
    var ndata = [] ;
    var total = this.state.totalPrice ;
    for(var i = 0, cnt = 0  ; i < data.length ; i++){
      if(data[i].key === del){
        total -= data[i].price ;
        continue ;
      }
      console.log(data[i].key) ;
      data[i].key = ++cnt ;
      ndata.push(data[i]) ;
    }

    
    data = this.state.data;
    data.data = ndata ;
    this.setState({data : data , totalPrice : total} );
    this.setState({del : 0}) ;
    
  },
  render: function(){
    

    return (
        <div>
          
          <div className={this.state.messageType}>
                  {this.state.message}
          </div>  

          <div className = "form-horizontal">
                  
            

            <div className = "form-group">
              <label className = "col-sm-2 control-label"> Customer </label>
              <div className = "col-sm-4">
                <input className = "form-control" name = "customer"  onChange = {this.handleCustomerChange} id = "customer" placeholder = "Customer"/>
              </div>
            </div>

            <div className = "form-group">
              <label className = "col-sm-2 control-label"> Discount </label>
              <div className = "col-sm-4">
                <input className = "form-control" name = "discount"  onChange = {this.handleDiscountChange}  id = "discount" placeholder = "Discount"/>
              </div>
            </div>
            
            
            

            <br />

            <RTable data = {this.state.data.data} />

            
            <div className = "pull-right">
              <div>
                <strong>Total Price : </strong> {this.state.totalPrice}  
              </div>
              <button className = "btn btn-primary" onClick = {this.handleSubmitClick}> Submit </button>
            </div>

            <br />
            <br />

            <form>

              <h3 className = "col-sm-offset-3"> Add Product </h3>

              <div className = "form-group">
                <label className = "col-sm-2 control-label"> Product </label>
                <div className = "col-sm-4">
                  <input className = "form-control" name = "product" onChange = {this.handleProductChange} placeholder = "Product" />
                </div>
              </div>
              <div className = "form-group">
                <label className = "col-sm-2 control-label"> Unit </label>
                <div className = "col-sm-4">
                  <input className = "form-control" name = "unit" onChange = {this.handleUnitChange} placeholder = "Unit" />
                </div>
              </div>
              <div className = "form-group">
                <label className = "col-sm-2 control-label"> Price / Unit </label>
                <div className = "col-sm-4">
                  <input className = "form-control" name = "pricePunit" onChange = {this.handlePPUnitChange} placeholder = "Price / Unit" />
                </div>
              </div>
              <div className = "col-sm-offset-2">
                <button className = "btn btn-primary" onClick = {this.handleClick}  type = "reset"> Add New </button>
              </div>

            </form>

            <br />
            <br />
              
              <h3 className = "col-sm-offset-3"> Delete Product </h3>

              <div className = "form-group">
                <label className = "col-sm-2 control-label"> Delete </label>
                <div className = "col-sm-4">
                  <input className = "form-control" name = "delete" onChange = {this.handleDeleteChange} placeholder = "Delete" />
                </div>
              </div>
              <div className = "col-sm-offset-2">
                <button className = "btn btn-primary" onClick = {this.handleDelete}  type = "reset"> Delete </button>
              </div>


            


            <form>

              <h3 className = "col-sm-offset-3"> Update Product </h3>
              
              <div className = "form-group">
                <label className = "col-sm-2 control-label"> Product # </label>
                <div className = "col-sm-4">
                  <input className = "form-control" name = "key" onChange = {this.handleKeyChange} placeholder = "Product no" />
                </div>
              </div>

              <div className = "form-group">
                <label className = "col-sm-2 control-label"> Product </label>
                <div className = "col-sm-4">
                  <input className = "form-control" name = "product" onChange = {this.handleProductChange} placeholder = "Product" />
                </div>
              </div>
              <div className = "form-group">
                <label className = "col-sm-2 control-label"> Unit </label>
                <div className = "col-sm-4">
                  <input className = "form-control" name = "unit" onChange = {this.handleUnitChange} placeholder = "Unit" />
                </div>
              </div>
              <div className = "form-group">
                <label className = "col-sm-2 control-label"> Price / Unit </label>
                <div className = "col-sm-4">
                  <input className = "form-control" name = "pricePunit" onChange = {this.handlePPUnitChange} placeholder = "Price / Unit" />
                </div>
              </div>
              <div className = "col-sm-offset-2">
                <button className = "btn btn-primary" onClick = {this.handleUpdate}  type = "reset"> Update </button>
              </div>

            </form>

          </div>
        </div>
    );
  }
});







module.exports = SalesReceiptForm ;



var RTable = React.createClass({
    getInitialState: function() {
        return {data: []};
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
                <RTableHeader data={this.props.data}  />
                <TableBody data={this.props.data} />
            </table>
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


var RTableHeader = React.createClass({
    render: function() {
        
        return (
            <thead>
                <tr> 
                  <td> # </td>
                  <td> Product </td>
                  <td> Unit </td>
                  <td> Price / Unit </td>
                  <td> Price </td>
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