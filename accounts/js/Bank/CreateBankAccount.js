var React = require("react") ;


var CreateBankAccount = React.createClass({

    getInitialState : function(){
      return ({
         data : {
            'acc_number' : "" ,
            'bank_bic' : "" ,
            'state' : "bank" ,
            'bank_name' : "" ,
         } ,

         temp : {
            'acc_number' : "" ,
            'bank_bic' : "" ,
            'state' : "bank" ,
            'bank_name' : "" ,
         } 

      });
    },

    handleChange : function(){
      var tmp  = this.state.temp ;
      tmp[event.target.name] = event.target.value ;
      this.setState({'temp' : tmp}) ; 
    },

    handleSubmit : function(){
      $.ajax({
            url: config.accounts.base_url + '/accounts/v1/create_bank_account',
            dataType: 'json',
            data: JSON.stringify(this.state.temp),
            method: 'POST',
            success: function(data) {
              alert("Thank You") ;
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({'messageType': 'bg-danger', 'message': err.toString()});
               
                alert("OH! NO!");
            }.bind(this)
        });
    },

    render: function(){

        return (

            <div  className = "container">

                <div className = "form-horizontal">
                    
                    <div className = "form-group">
                    
                      <label className = "col-sm-2 control-label"> Bank Name </label>
                    
                      <div className = "col-sm-4">
                        <input className = "form-control" name = "bank_name" onChange = {this.handleChange}  placeholder = "Bank Name"/>
                      </div>
                    
                    </div>

                    <div className = "form-group">
                      <label className = "col-sm-2 control-label"> Bank Identifier Code </label>
                      
                      <div className = "col-sm-4">
                        <input className = "form-control" name = "bank_bic" onChange = {this.handleChange} placeholder = "Bank Identifier Code"/>
                      </div>

                    </div>

                     <div className = "form-group">
                      <label className = "col-sm-2 control-label"> Account Number </label>
                      
                      <div className = "col-sm-4">
                        <input className = "form-control" name = "acc_number" onChange = {this.handleChange} placeholder = "Account Number"/>
                      </div>

                    </div>


                    <button className = "btn btn-success col-sm-offset-2" onClick = {this.handleSubmit} name = "submit"> Submit </button>

                </div>



            </div>
        );
    }
});


module.exports = CreateBankAccount ;