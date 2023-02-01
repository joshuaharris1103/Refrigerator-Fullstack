# Refrigerator-Fullstack-Project

The Refrigerator App will let a user be able to track expiration and what items are in the fridge. The application will allow for users the import, remove, and "date dot" their items freely and remotely via signing in their account.

## User Interactions
- A user will be able to, create an account. 
- A user will be able to, sign in.
- A user will be able to, sign out.
- A user will be able to, log food/drink item.
- A user will be able to, delete foods/drinks that have been used up or expired.
- A user will be able to, log when item was first added to the fridge.
- A user will be able to, add photos of items for visual reference.
- A user will be able to, see the time left of items in the fridge.

## Wireframes / Application Shots
![image](https://user-images.githubusercontent.com/106713788/216140186-22aa9658-a3d5-4273-a0dc-a7cf9d30914f.png)
![image](https://user-images.githubusercontent.com/106713788/216140256-abba8f1a-05b5-46e7-b4f8-70ae22e41ade.png)
![image](https://user-images.githubusercontent.com/106713788/216140320-3eec4d34-4190-4655-8e7b-3caff9b15b29.png)
![image](https://user-images.githubusercontent.com/106713788/216140368-1596771b-5648-4b32-80b0-439a15e2d67f.png)
![image](https://user-images.githubusercontent.com/106713788/216140406-bfef0f0a-6e3f-4e2d-83f6-bf1bfadc03b4.png)

## Routes Table

#### Fridge

| **URL**          | **HTTP Verb**|**Action**|
|------------------|--------------|----------|
| /fridge/         | GET          | index  
| /fridge/:id      | GET          | show       
| /fridge/new      | GET          | new   
| /fridge          | POST         | create   
| /fridge/:id/edit | GET          | edit       
| /fridge/:id      | PATCH/PUT    | update    
| /fridge/:id      | DELETE       | destroy  

### Users
| **URL**          | **HTTP Verb**|**Action**|
|------------------|--------------|----------|
| /auth/signup    | POST         | create  
| /auth/login     | POST         | create       
| /auth/logout    | DELETE       | destroy  





## Entity Relationship Diagram

![image](https://user-images.githubusercontent.com/106713788/214084552-fadd79d3-8d17-40b0-a773-10c55bb4d1bf.png)


## Technologies Used:
- Javascript
- Mongoose
- MongoDB
- Express
- NodeJS
- Liquid# refrigerator-fullstack
