
var Ajv = require('ajv');
var ajv = new Ajv({
    meta: false, // optional, to prevent adding draft-06 meta-schema
    extendRefs: true, // optional, current default is to 'fail', spec behaviour is to 'ignore'
    unknownFormats: 'ignore',  // optional, current default is true (fail)
});

var metaSchema = require('ajv/lib/refs/json-schema-draft-04.json');
// metaSchema.$id = metaSchema.id;
ajv.addMetaSchema(metaSchema);
ajv._opts.defaultMeta = metaSchema.id;

// optional, using unversioned URI is out of spec, see https://github.com/json-schema-org/json-schema-spec/issues/216
ajv._refs['http://json-schema.org/schema'] = metaSchema.$schema;

// Optionally you can also disable keywords defined in draft-06
ajv.removeKeyword('propertyNames');
ajv.removeKeyword('contains');
ajv.removeKeyword('const');


var ajv6 = new Ajv();

// ajv.compile(obj);
function compile(schema) {
    ajv6.compile(schema);
}

function validate(schema, data) {
    return ajv6.validate(schema, data);
}
module.exports = {compile,validate}