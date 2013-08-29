exports.definition = {
 
    config: {
        "columns": {
            ms: "INTEGER",
            type: "TEXT",            
            event: "TEXT"
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
 
            // extended functions go here           

        }); // end extend
 
        return Collection;
    }
 
}