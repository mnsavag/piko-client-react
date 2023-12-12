# piko-client-react

Application for creating surveys in the form of contests.

You can access it here http://31.129.106.57:3001/

Also You can see the server implementation here https://github.com/mnsavag/piko-server-nestjs

## Main stack

- Javascript
- React
- Redux toolkit
- Axios
- CSS

## Implementation

- Sorting cards by fields
- Fields Validation
- Interaction with the server. Sending/Receiving requests. **By Axios**
- Creation of tournament cards. **By Redux toolkit**
- Tournament formation logic
- Tournament logic

## Interacting with app

### Home Page

All polls are here. You can go through them by clicking the "start" button.

Or see the rating by clicking the "show result" button.

**Example**

![alt text](https://github.com/mnsavag/piko-client-react/blob/master/site-home-page.png?raw=true)

### Create Championship Page

Here you can create your survey. Available image formats: png/jpg/jpeg.

At the moment the editor preview does not correspond to the real preview.
​
### Other Page Example

![alt text](https://github.com/mnsavag/piko-client-react/blob/master/tournament-page-1.png?raw=true)

![alt text](https://github.com/mnsavag/piko-client-react/blob/master/tournament-page-2.png?raw=true)

![alt text](https://github.com/mnsavag/piko-client-react/blob/master/result-page.png?raw=true)

## Client-server interaction

for implement client-server interaction, create the .env file and add a variable

```bash
REACT_APP_API_URL
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
npm run dev
```
