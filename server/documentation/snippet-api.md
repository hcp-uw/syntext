# Endpoint:/api/snippet/create

**Note:** responses to POST and DELETE requests contain a built in success property to make error handling easy




### <span style="color:LightBlue">Method:</span> POST

### Description: Create a new snippet object.

### Request Parameters:
| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| id | Number | Yes | The id of the snippet. |
| type | String | Yes | The type of the snippet. |
| length | Number | Yes | The length of the snippet. |
| data | String | Yes | The data of the snippet. |

### <span style="color:green">Success Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 201 | Snippet created |

### <span style="color:red">Error Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 400 | Bad Request: Missing data in request body |
| 500 | Internal Server Error |

# Endpoint:/api/snippet/remove

### <span style="color:LightBlue">Method:</span> DELETE

### Description: Remove a snippet object by id.

### Request Parameters:
| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| id | Number | Yes | The id of the snippet. |

### <span style="color:green">Success Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 202 | Snippet deleted |

### <span style="color:red">Error Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 400 | Bad Request: Missing id parameter |
| 404 | Not Found: Snippet not found |
| 500 | Internal Server Error |

# Endpoint:/api/snippet/get/length

### <span style="color:LightBlue">Method:</span> GET

### Description: Get all snippets of a given length.

### Request Parameters:
| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| length | Number | Yes | The length of the snippets. |

### <span style="color:green">Success Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 200 | An array of snippet objects. |

### <span style="color:red">Error Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 400 | Bad Request: Missing length parameter |
| 404 | Not Found: No snippets found with given length |
| 500 | Internal Server Error |

# Endpoint:/api/snippet/get/lengthandtype

### <span style="color:LightBlue">Method:</span> GET

### Description: Get all snippets of a given length and type.

### Request Parameters:
| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| length | Number | Yes | The length of the snippets. |
| type | String | Yes | The type of the snippets. |

### <span style="color:green">Success Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 200 | An array of snippet objects. |

### <span style="color:red">Error Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 400 | Bad Request: Missing length or type parameter |
| 404 | Not Found: No snippets found with given length and type |
| 500 | Internal Server Error |

# Endpoint:/api/snippet/get/type

### <span style="color:LightBlue">Method:</span> GET

### Description: Get all snippets of a given type.

### Request Parameters:
| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| type | String | Yes | The type of the snippets. |

### <span style="color:green">Success Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 200 | An array of snippet objects. |

### <span style="color:red">Error Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 400 | Bad Request: Missing type parameter |
| 404 | Not Found: No snippets found with given type |
| 500 | Internal Server Error |

# Endpoint:/api/snippet/get/id

### <span style="color:LightBlue">Method:</span> GET

### Description: Get a snippet object by id.

### Request Parameters:
| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| id | Number | Yes | The id of the snippet to retrieve. |

### <span style="color:green">Success Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 200 | OK |
| Body | The snippet object with the specified id. |

### <span style="color:red">Error Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 404 | Snippet not found |
| 500 | Internal Server Error |
