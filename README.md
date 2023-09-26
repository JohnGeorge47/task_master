### Task master

This is a very basic task creation CRUD app. It is written in nodejs and uses postgres as the data store it has the following apis
and their contracts are also defined below
1. Create task
    ```
   [POST] {url}/api/tasks
    ```
   | Params | Value  |
   |--------|--------|
   | name   | string |

   Response 200 Ok
   ```
   {
     "message" : "Task created successfully"
      "id":1
   }
   ```
2. Update task
   ```
   [PUT] {url}/api/tasks/{taskId}
   ```
   | Params | Value   |
   |--------|---------|
   | name   | string  | 
    | status | integer |
 
   Response
   ```
   {
      "message": "Task updated succssfully
   }
   ```

3. Getall tasks
   ```
   [GET] {url}/api/tasks
   ```
   | Params   | Value   |
      |----------|---------|
   | limit    | integer | 
   | offset   | integer |
    | order_by | string  |
     | sort     | string  |

    ***Note:***

     a. order_by: Allowed values are "id","created_at","updated_at"

     b. sort: ASC or DESC



4. Get metrics
   ```
   [GET] {url}/api/tasks/metrics
   ```
   Response
   
   ```   
    "data": {
        "open_tasks": "4",
        "inprogress_tasks": "1",
        "completed_tasks": 0
    ```
5. Get metrics timeline
   ```
   [GET] {url}/api/tasks/metrics_timeline
   ```
   Response
   ```
   {
    "data": {
        "2023-09-20": {
            "open_tasks": "1",
            "inprogress_tasks": 0,
            "completed_tasks": 0
        },
        "2023-09-22": {
            "open_tasks": "1",
            "inprogress_tasks": "1",
            "completed_tasks": 0
        },
        "2023-09-25": {
            "open_tasks": "2",
            "inprogress_tasks": 0,
            "completed_tasks": "1"
        }
    }
   ```

#### How to get this working
The entire project has been dockerized. So here are the steps

1. Download docker if you do not have it
2. The docker compose file can be found in the root
3. Run ```docker-compose up --build``` this will pull all the necessary images and will start everything as well as create necessary tables. This should be run in root.
4. The server will be then running on port 8080
5. I have also added pgadmin for this project. It will make verifying data easier visually, this will be running on ```http://localhost:16543/browser/#``` the credentials can be found in the docker file.
6. Now you can query the api using the postman collection which has been shared. I cannot share it here but will send it by mail.