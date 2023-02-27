
module.exports.datetimeStringConverter = datetimeStringConverter;
module.exports.recordDatetimeStringConverter = recordDatetimeStringConverter;

function datetimeStringConverter(datetime) {
    const date = new Date(datetime);
    return date.toLocaleString('sv');
}

function recordDatetimeStringConverter(record) {
    if (record.created_datetime) {
        record.created_datetime = datetimeStringConverter(record.created_datetime);
    }
    if (record.updated_datetime) {
        record.updated_datetime = datetimeStringConverter(record.updated_datetime);
    }
    if (record.asset_created_datetime) {
        record.asset_created_datetime = datetimeStringConverter(record.asset_created_datetime);
    }
    if (record.asset_updated_datetime) {
        record.asset_updated_datetime = datetimeStringConverter(record.asset_updated_datetime);
    }
    if (record.end_of_life) {
        record.end_of_life = datetimeStringConverter(record.end_of_life);
    }
    if (record.collection_created_datetime) {
        record.collection_created_datetime = datetimeStringConverter(record.collection_created_datetime);
    }
    return record
}