var moment = require('alloy/moment');

$.index.open();

var records = Alloy.Collections.EventRecord;
records.fetch();

Ti.Network.addEventListener("change", recordEvent);

function recordEvent(e) {
    var d = new Date();
    var m = new Alloy.createModel("EventRecord", {
        ms: d.getTime(),
        type: e.type,
        event: JSON.stringify(e)
    });
    m.save();
    records.fetch();
}


Ti.Geolocation.setTrackSignificantLocationChange(true);
Ti.Geolocation.addEventListener("location", recordEvent);


function transformEventRecord(r) {
    var obj = r.toJSON();
    
    var e = JSON.parse(obj.event);

    obj.ago = moment(obj.ms).fromNow();
    
    obj.label = e.type;
    
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
