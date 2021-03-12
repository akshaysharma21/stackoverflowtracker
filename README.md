**Description**

This application is implemented using React.js which queries the stack overflow API with the tags and query provided by the user using the axios library and displays the data in an organized manner. The app accepts user's queries as HTML form data. This data contains the tags that the user wants to search for in stack overflow along with the type of user query. The query types are as follows and all the queries return results for the past week sorted by creation dates.

<br/>

**Queries**

- **Latest: **The app displays a list of 10 latest questions related to the tags provided by the user.

- **Most voted:** The app displays a list of 10 most voted questions from the past week related to the tags provided by the user.

- **Both:** The app displays a list of 20 questions (or as many as available) which is an aggregation of the above two lists sorted by creation dates.

<br/>

**Logic**

The logic of the app follows a simple flow. When the user enters a tag and a query, they are used to update the state of the react app. When the form is submitted, a submission handler is executed that constructs the appropriate request URL with the user submitted tags and query type. In case of separate lists (most voted query and Latest query), the request is executed to get the result list. In case of Both queries, both requests are sent synchronously, and the results are aggregated in one list. After the result list is made, it is then sorted by creation dates. This sorted list is then used to render a list of nested collapsible elements (the lists expand as follows: questions -> comments and answers, answers -> answer comments) using react-dom. Whenever another query is sent, the same logic is repeated.

<br/>

**Frameworks and Languages**

This application is implemented using React.js framework. The development language is node.js and JSX.

<br/>

**Links to GitHub Repo and Docker Hub Image**

**GitHub repo: **<https://github.com/akshaysharma21/stackoverflowtracker>

**Docker Hub Image repo: **<https://hub.docker.com/repository/docker/akshaysharma21/stackoverflowtracker>

<br/>

**Instructions:**

**How to pull the Image**

On a machine with docker installed, open the Command Prompt, and run the following command:

- "docker pull akshaysharma21/stackoverflowtracker:latest "

**How to run the image in a container**

After pulling the image from docker hub, run the following command to build and run the image in a container:

- "docker run -p <the port you want to use>:3000 akshaysharma21/stackoverflowtracker"

- For the rest of this example, we will be using 3000 as the port we want to use. Therefore, the run command will be:
    - "docker run -p 3000:3000 akshaysharma21/stackoverflowtracker"

**How to access and navigate the app**

After running the docker image, open your browser and visit the like "localhost:3000" to access the app website.

In this website, you will see a welcome screen and a navbar with two options: Instructions and Search Stack Overflow.

The instructions link will give you instructions on how to navigate the app (The same instructions can be found below) and the search link will take you to the actual application.

The Instructions are as follows:

*Click the "Search stack overflow" link on the navbar to access the search*

*Enter the tags you want to search in the tags field separated by a semicolon ';' and without space. (eg: Docker;React)*

<br/>

***Select one of the following three options for query type:***

-   ***Newest:**** This will return a list of 10 newest queries sorted by creation date.*
-   ***Most Voted:**** This will return a list of 10 most voted queries sorted by creation date.*
-   ***Both:**** This will return an aggregated list of 10 newest and 10 most voted queries sorted by creation date.*

*Press the **Search Tag** button*

*A list of collapsible elements will be displayed on the screen. Click on any question to reveal its contents and collapsible for its comments and answers. Click the comments collapsible to reveal the comments regarding the question. Click the answers collapsible to reveal a list of answers and collapsible answer comments for each answer. Click on the answer comments collapsible in this list to reveal the comments for the answer.*