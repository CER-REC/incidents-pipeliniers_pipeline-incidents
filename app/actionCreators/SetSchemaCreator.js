function SetSchemaCreator (schema) {
  return {
    type: 'SetSchema',
    schema: schema,
  }
}

module.exports = SetSchemaCreator