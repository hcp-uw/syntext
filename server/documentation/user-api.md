### <span style="color:LightBlue">Method:</span> POST

### Description: 
This endpoint receives a request with a username and password in the request body. It then hashes the password using bcrypt and saves the new user to a database. If successful, it creates a JSON Web Token (JWT) and sends it back in the response with a 201 status code. If the request fails, it sends an error message with a 500 status code.

### Request Parameters:
| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| username  | string | yes | The username of the new user. |
| password  | string | yes | The password of the new user. |

### <span style="color:green">Success Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 201         | { "success": true } |

### <span style="color:red">Error Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 400         | { "success": false, "error": "Missing required fields" } |
| 500         | { "success": false, ...error } |



### Description: 
This endpoint receives a request with a username and password in the request body. It then verifies if the user exists in the database and checks if the password matches using bcrypt. If successful, it creates a JSON Web Token (JWT) and sends it back in the response with a 200 status code, updating the user's last login time. If the request fails, it sends an error message with a 401 or 500 status code.

### Request Parameters:
| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| username  | string | yes | The username of the user trying to log in. |
| password  | string | yes | The password of the user trying to log in. |

### <span style="color:green">Success Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 200         | { "success": true } |

### <span style="color:red">Error Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 400         | { "success": false, "error": "Missing required fields" } |
| 401         | { "success": false, "error": "Invalid username or password" } |
| 500         | { "success": false, "error": "Server error" } |



### <span style="color:LightBlue">Method:</span> GET

### Description: 
This endpoint receives a request with a JWT token in the `Authorization` header. It then verifies the token and finds the corresponding user in the database. If successful, it sends the user data in the response with a 200 status code. If the request fails, it sends an error message with a 401 or 500 status code.

### Request Parameters:
This endpoint does not have any request parameters.

### <span style="color:green">Success Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 200         | { "success": true, ...user data } |

### <span style="color:red">Error Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 401         | { "success": false } |
| 500         | { "success": false } |






### <span style="color:LightBlue">Method:</span> PUT

### Description: 
This endpoint receives a request with a JWT token in the `Authorization` header, and new user data in the request body. It then verifies the token, finds the corresponding user in the database, updates their data, and saves the updated user object in the database. If successful, it sends an empty response with a 204 status code. If the request fails, it sends an error message with a 401 or 500 status code.

### Request Parameters:
| Parameter    | Type   | Required | Description               |
| ------------ | ------ | -------- | ------------------------- |
| newUsername  | string | No       | The new username to set.  |
| newPassword  | string | No       | The new password to set.  |

### <span style="color:green">Success Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 204         |             |

### <span style="color:red">Error Response:</span>
| Status Code | Description                                        |
| ----------- | -------------------------------------------------- |
| 401         | { "success": false }                               |
| 500         | { "success": false, "error": "Server error" }      |


### <span style="color:LightBlue">Method:</span> DELETE

### Description: 
Deletes a user account from the database based on the decoded JWT token in the Authorization header.

### Request Parameters:
| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| Authorization | string | Yes | JWT token in the format 'Bearer [token]'. |

### <span style="color:green">Success Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 204 | The user account has been successfully deleted. |

### <span style="color:red">Error Response:</span>
| Status Code | Description |
| ----------- | ----------- |
| 401 | The request could not be authorized due to an invalid or expired token. |
| 500 | The server encountered an error while processing the request. |






### Description: 

### Request Parameters:
| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |


### <span style="color:green">Success Response:</span>
| Status Code | Description |
| ----------- | ----------- |


### <span style="color:red">Error Response:</span>
| Status Code | Description |
| ----------- | ----------- |
