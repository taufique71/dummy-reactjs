var React = require("react");

var AssetForm = React.createClass({
    getInitialState: function(){
        return {
            'method_number': null,
            'code': null,
            'method_end': null,
            'prorata': null,
            'salvage_value': null,
            'currency_id': null,
            'method_time': null,
            'active': null,
            'partner_id': null,
            'name': null,
            'method_progress_factor': null,
            'purchase_value': null,
            'company_id': null,
            'note': null,
            'parent_id': null,
            'state': null,
            'method_period': null,
            'purchase_date': null,
            'category_id': null,
            'method': null
        }
    },
    handleChange: function(event){
        var data = {};
        //console.log(event.target)
        if(event.target['type']){
            if(event.target.type=='checkbox'){
                if(event.target.checked) data[event.target.name] = true;
                else data[event.target.name] = false;
            }
            else{
                data[event.target.name] = event.target.value;
            }
        }
        else data[event.target.name] = event.target.value;
        this.setState(data);
    },
    handleSubmit: function(event){
        event.preventDefault();
        var data = {
            'method_number': this.state.method_number,
            'code': this.state.code,
            'method_end': this.state.method_end,
            'prorata': this.state.prorata,
            'salvage_value': this.state.salvage_value,
            'currency_id': this.state.currency_id,
            'method_time': this.state.method_time,
            'active': this.state.active,
            'partner_id': this.state.partner_id,
            'name': this.state.name,
            'method_progress_factor': this.state.method_progress_factor,
            'purchase_value': this.state.purchase_value,
            'company_id': this.state.company_id,
            'note': this.state.note,
            'parent_id': this.state.parent_id,
            'state': this.state.state,
            'method_period': this.state.method_period,
            'purchase_date': this.state.purchase_date,
            'category_id': this.state.category_id,
            'method': this.state.method
        }
        console.log('POST payload data:', data);
        $.ajax({
            url: config.generic.base_url + '/accounts/v1/create_asset',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            method: 'POST',
            success: function(data) {
                console.log('Request successful');
                $('#asset-create-form').prepend(
                    $('<div/>').attr({
                        'class': 'alert alert-success alert-dismissible',
                        'role': 'alert'
                    }).append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>').append('Submission successful')
                );
            },
            error: function(xhr, status, err) {
                console.log('Request unsuccessful');
                $('#asset-create-form').prepend(
                    $('<div/>').attr({
                        'class': 'alert alert-danger alert-dismissible',
                        'role': 'alert'
                    }).append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>').append('Submission unsuccessful')
                );
            }
        });
    },
    componentDidMount: function(){
         $.ajax({
            url: config.generic.base_url + '/accounts/v1/select_asset_category',
            dataType: 'json',
            contentType: 'application/json',
            method: 'GET',
            success: function(data) {
                var categoryDOM = $('select[name=category_id]');
                for(i in data){
                    categoryDOM.append(
                        '<option value="' + data[i].id + '">' + data[i].name + '</option>'
                    );
                }
                $.ajax({
                    url: config.generic.base_url + '/accounts/v1/select_asset',
                    dataType: 'json',
                    contentType: 'application/json',
                    method: 'GET',
                    success: function(data) {
                        var categoryDOM = $('select[name=parent_id]');
                        for(i in data){
                            categoryDOM.append(
                                '<option value="' + data[i].id + '">' + data[i].name + '</option>'
                            );
                        }
                    },
                    error: function(xhr, status, err) {
                        console.log('Asset category fetch successful');
                        console.log('Asset fetch unsuccessful');
                    }
                });
            },
            error: function(xhr, status, err) {
                console.log('Asset category fetch unsuccessful');
            }
        });
    },
    render: function(){
        return (
            <div >
                <h2>Create Asset</h2>
                <hr/>
                <form className="form-horizontal" id="asset-create-form">
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Asset Name</label>
                        <div className="col-sm-6">
                            <input className="form-control" name="name" value={this.state.name} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <hr/>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">Asset Category</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="category_id" value={this.state.category_id} onChange={this.handleChange}>
                                <option value="null"></option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Reference</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="code" value={this.state.code} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Parent Asset</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="parent_id" value={this.state.parent_id} onChange={this.handleChange}>
                                <option value="null"></option>
                            </select>
                        </div>
                    </div>
                    <hr/>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">Purchase Date</label>
                        <div className="col-sm-3">
                            <input 
                            className="form-control"
                            type = "date"
                            name="purchase_date" 
                            value={this.state.purchase_date} 
                            onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <hr/>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">Gross Value</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="purchase_value" value={this.state.purchase_value} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Salvage Value</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="salvage_value" value={this.state.salvage_value} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Partner</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="partner_id" value={this.state.partner_id} onChange={this.handleChange}>
                                <option value="null"></option>
                                <option value="1">your company</option>
                                <option value="3">administrator</option>
                                <option value="4">public user</option>
                            </select>
                        </div>
                    </div>
                    <hr/>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">Computation Method</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="method" value={this.state.method} onChange={this.handleChange}>
                                <option value="null"></option>
                                <option value="linear">Linear</option>
                                <option value="degressive">Degressive</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Degression Factor</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="method_progress_factor" value={this.state.method_progress_factor} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Time Method</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="method_time" value={this.state.method_time} onChange={this.handleChange}>
                                <option value="null"></option>
                                <option value="number">Number of Depreciations</option>
                                <option value="end">Ending Date</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Number of depreciations</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="method_number" value={this.state.method_number} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Prorata Temporis</label>
                        <div className="col-sm-1">
                            <input className="form-control" type="checkbox" name="prorata" value={this.state.prorata} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Number of months in a period</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="method_period" value={this.state.method_period} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Ending Date</label>
                        <div className="col-sm-3">
                            <input className="form-control" type="date" name="method_end" value={this.state.method_end} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <hr/>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">Company</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="company_id" value={this.state.company_id} onChange={this.handleChange}>
                                <option value="null"></option>
                                <option value="1">Your Company</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Currency</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="currency_id" value={this.state.currency_id} onChange={this.handleChange}>
                                <option value="null"></option>
                                <option value="56">BDT</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Active</label>
                        <div className="col-sm-1">
                            <input className="form-control" type="checkbox" name="active" value={this.state.active} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Status</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="state" value={this.state.state} onChange={this.handleChange}>
                                <option value="null"></option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                    </div>
                    <hr/>
                    
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Note</label>
                        <div className="col-sm-6">
                            <textarea className="form-control" rows="3" name="note" value={this.state.note} onChange={this.handleChange}></textarea>
                        </div>
                    </div>
                    <hr/>

                    <div className="form-group">
                        <label className="col-sm-3 control-label"></label>
                        <div className="col-sm-3">
                            <input className="btn btn-default" type="submit" value="Create" onClick={this.handleSubmit} />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = AssetForm;
