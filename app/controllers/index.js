var moment = require('alloy/moment');

$.index.open();

var records = Alloy.Collections.EventRecord;
records.fetch();

function recordEvent(e) {
    var d = new Date();
    
    var m = new Alloy.createModel("EventRecord", {
        eventTime: ""+d.getTime(),
        type: e.type,
        event: JSON.stringify(e),
        paused: paused
    });
    m.save();
    records.fetch();
}


Ti.Network.addEventListener("change", recordEvent);

Ti.Geolocation.setTrackSignificantLocationChange(true);
Ti.Geolocation.addEventListener("location", recordEvent);

var paused = false;
Ti.App.addEventListener("pause", function(e) {
	recordEvent(e);
	paused = true;
});
Ti.App.addEventListener("paused", recordEvent);
Ti.App.addEventListener("resume", function(e) {
	recordEvent(e);
	paused = false;
});
Ti.App.addEventListener("resumed", recordEvent);


function transformEventRecord(r) {
    var obj = r.toJSON();
    
    var e = JSON.parse(obj.event);

	var d = new Date();
	d.setTime(obj.eventTime);
    obj.ago = moment(d).fromNow();
    
    switch(e.type) {
    	case "change": 
    		obj.label = e.networkTypeName;
    		break;
    	case "location": 
    		obj.label = e.accuracy;
    		break;
    	default:
    		obj.label = e.type;
    		break;
    };

console.log(obj.paused);
	if (obj.paused) {
console.log('rowClass');
		obj.rowClass = "paused";
	}
    
    return obj;
}

function clickRow(e) {
    var m = records.get(e.rowData.modelId);
    alert(m.get("event"));
}

function update(e) {
    records.fetch({
        success: e.hide,
        error: e.hide
    });
}
