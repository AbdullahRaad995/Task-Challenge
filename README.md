# Requirements :
  - node js
  - mongo database
# installation :
  - git clone https://github.com/AbdullahRaad995/Task-Challenge.git

  ## installation of phone number validation microservice : 
    * run the followig commands : 
      - cd number-validation-microservice
      - npm install 
      - npm run dev
    * u can change the port of server by specify it in .env file , default port 3000

  ## installation of api server :
    * make sure the phone number validation microservice was running
    * run the followig commands : 
      - cd Item-api
      - npm install 
      - npm run dev
    * specify the phone number validation microservice uri in .env file 
    * specify the the databse uri in .env file
    * u can change the port of server by specify it in .env file , default port 3001

  ## installation of react app : 
    * make sure the phone number validation microservice and api server was running
    * run the followig commands : 
      - cd item-webpage
      - npm install 
      - npm run dev
    * specify the the server url in .env file   
    * after finsih the development run command (npm run build)
    * copy the dist folder created by command above to root directory of api server
    
# Documentation : 
  ## Phone Number Microservice api :
    ### Validate Phone Number 
      - Base URL : GET /validate
      - Param required : number
      - example : Get http://localhost:3000/validate?number=+961123456
      - response : {
        "countryCode": "LB",
        "countryName": "Lebanon",
        "operatorName": "Alfa"
      }
  ## Backend Server api :
    ### Get All Items : 
      - Base URL : GET /api/items
      - example : Get http://localhost:3001/api/items
      - response : [
            {
                "_id": "6783eaf9c2bbe15c85bf28e9",
                "name": "asf",
                "discription": "aga",
                "phone_number": "+96176115030",
                "phone_info": "6783eaf9c2bbe15c85bf28e7",
                "category": "6783eac7c2bbe15c85bf28e5",
                "__v": 0
            }
        ]
    ### Get certain item by id :
      - Base URL : GET /api/item/{id}
      - example : Get http://localhost:3001/api/item/6783eaf9c2bbe15c85bf28e9
      - response : {
          "_id": "6783eaf9c2bbe15c85bf28e9",
          "name": "asf",
          "discription": "aga",
          "phone_number": "+96176115030",
          "phone_info": {
              "_id": "6783eaf9c2bbe15c85bf28e7",
              "country_name": "Lebanon",
              "country_code": "LB",
              "operator_name": "Alfa",
              "__v": 0
          },
          "category": {
              "_id": "6783eac7c2bbe15c85bf28e5",
              "name": "Food",
              "__v": 0
          },
          "__v": 0
      }
          
    ### add item:
      - Base URL : POST /api/item
      - example : POST http://localhost:3001/api/item
      - param : {
          "name":"asf",
          "discription":"aga",
          "phone_number":"+96176115030",
          "category" :  "6783eac7c2bbe15c85bf28e5"
      }
      - response : {
          "name": "asf",
          "discription": "aga",
          "phone_number": "+96176115030",
          "phone_info": "6783eaf9c2bbe15c85bf28e7",
          "category": "6783eac7c2bbe15c85bf28e5",
          "_id": "6783eaf9c2bbe15c85bf28e9",
          "__v": 0
      }
      
    ### update item :
      - Base URL : POST /api/item/{id}
      - example : POST http://localhost:3001/api/item/6783eaf9c2bbe15c85bf28e9
      - param : {
          "name":"asft"
      }
      - response : {
          "name": "asft",
          "discription": "aga",
          "phone_number": "+96176115030",
          "phone_info": "6783eaf9c2bbe15c85bf28e7",
          "category": "6783eac7c2bbe15c85bf28e5",
          "_id": "6783eaf9c2bbe15c85bf28e9",
          "__v": 0
      }
    ### delete Item :
      - Base URL : DELETE /api/item/{id}
      - example : DELETE http://localhost:3001/api/item/6783eaf9c2bbe15c85bf28e9
      - response status 200


# Tips for imporvement
  - for micro service :
    * make more tests by providing deffirent pattern like 00-countryCode instead of +-countryCode
    * improve the returing body of api when getting error, current response was text
  - for server api:
    * adjust the validation logic when adding or updating item, like checking the required fields , (name) for example
    * try to secure the endpoints to avoid guests from access them
    * make more test in connection and disconnection from database, and handle the errors correctly
    
    

