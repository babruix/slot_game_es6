# Run server

1. Install all required dependincies:
npm install

2. Run app via gulp nodemon on port 8000:
gulp

## API documentation.

Using express to implement a Rest API server that:
 * receive requests from client and return an outcome 
 /api/processSpin
   returns result in JSON format with outcome:
        - symbols: list of three random integers between 0-5;
        - textResult: No Win, Small Win, Big Win
        - bonusSpin : true/false
   