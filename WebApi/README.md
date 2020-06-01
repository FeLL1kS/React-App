### */auth*

*/auth/me*
**Response properties**
- data: required(object)
if user is authenticated then data contains all this properties
    - id: required(number)
    logged user id
    - email: required(string)
    logged user email
    - login: required(string)
    user login
- resultCode: required(number)
(0 if opearation completed successfullt, other numbers - some error occured)
- messages: required(array of string)
is empty if resultCode is 0, contains error messages if resultCode is different from 0

**Response:**
```json
{
    resultCode: 0
    messages: [],
    data: {
      id: 1,
      email: 'mail@mail.mail',
      login: 'login'
    }
}
```

*/auth/login*
**Request properties**
- email: required(string)
valid confirmed user email address, which used during registration
- password: required(string)
valid user password

**Response properties**
- resultCode: required(string)
0 - OK, 1 - request is invalid
is empty if resultCode is 0, contains error messages if resultCode is different from 0
- data: required(object)
if user is authenticated then data contains all this properties
	- userId: required(number)
	logged user id
	- email: required(string)
	logged user email

**Response:**
```json
{
    resultCode: 0
    messages: [],
    data: {
      userId: 1,
	  email: 'mail@mail.mail'
    }
}
```