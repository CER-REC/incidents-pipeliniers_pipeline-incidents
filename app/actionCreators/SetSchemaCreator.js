function SetSchemaCreator (schema) {
  return {
    type: 'SetSchema',
    schema: schema,
  }
}

export default SetSchemaCreator