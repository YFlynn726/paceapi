# App Name: Pace!
Live Link: https://paceclient.now.sh/

This api database holds information for the client side of this application.  The database holds information such as pace records(items), and a list of users.  This database consist of two tables: users and items that all have a relationship with one another through user_id.  

## API Documentation:

### usersRouter
| Method | HTTP request | Description |
|--------|:------------:|------------:|
| getAllUsers(get) | /api/users | Gets all the users |
| insertUser(post) | /api/users | Create a new user |
| getById(get) | /api/users/:id | Get a user by the id |

### itemsRouter
| Method | HTTP request | Description |
|--------|:------------:|------------:|
| getAllItems(get) | /api/items | Gets all the items |
| insertItem(post) | /api/items | Create/Add an item |
| getById(get) | /api/items/:id | Get a item by the id |
| deleteItem(delete) | /api/items/:id | Delete item |
| updateItem(patch) | /api/items/:id | update item information |


![ScreenShot](screenshot.png)


*Technologies Used: PostgresSQL, SQL, Node, Javascript, Express, Mocha and Chai* 
