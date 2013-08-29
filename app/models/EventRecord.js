exports.definition = {
 
    config: {
        "columns": {
            eventTime: "TEXT",
            type: "TEXT",            
            event: "TEXT",
            paused: "TEXT"
        },
        "defaults": {
        },
        "adapter": {
            type: "sql",
            collection_name: "EventRecords"
        },
    },      
 
    extendModel: function(Model) {      
        _.extend(Model.prototype, {
 
        }); // end extend
 
        return Model;
    },
 
 
    extendCollection: function(Collection) {        
        _.extend(Collection.prototype, {
 
    	    comparator : function(m) {
        	    return -1 * parseInt(m.get('eventTime'));
            }
            
        }); // end extend
 
        return Collection;
    }
 
};
