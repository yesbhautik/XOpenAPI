# TwitterOpenAPI | XOpenAPI

<p>
<img src="https://github.com/user-attachments/assets/a3a821a4-d615-4a1c-beca-7bca04a1dd18" style="width: 20%; border-radius: 20px">
</p>

TwitterOpenAPI is a Node.js application that uses the Rettiwt API to fetch and display Twitter data. The application provides various endpoints to search for tweets, get user profile information, and generate RSS feeds for the latest tweets.

## Notice

Currently pushed code is just initial code. We will be updating improved version of the documentation and code soon.
Milestones also will be added soon. Feel free to contribute.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Generate API Key

1. Installing rettiwt-api

    ```sh
    npm install -g rettiwt-api
    ```

2. Generate API key

    ```sh
    rettiwt auth login "<email>" "<username>" "<password>"
    ```

    Replace `<email>`, `<username>`, and `<password>` with your email, username, and password. After running the command, you will get an API key string.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/TwitterOpenAPI.git
    cd TwitterOpenAPI
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your Rettiwt API key:

    ```env
    T_API=your_rettiwt_api_key
    PORT=3000
    ```

## Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory and add the following variables:

- `T_API`: Your Rettiwt API key.
- `PORT`: The port on which the server will run (default is 3000).

## Usage

Start the server:

```sh
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

### Search Tweets

- **GET** `/search/:keyword`
  - Description: Search for tweets containing the specified keyword.
  - Query Parameters:
    - `minLikes`: Minimum number of likes (optional).
    - `minReplies`: Minimum number of replies (optional).
    - `minRetweets`: Minimum number of retweets (optional).
    - `language`: Language of the tweets (optional, default is "en").
  - Response: JSON object with the latest tweet containing the keyword.

- **GET** `/search/:keyword/feed`
  - Description: Generate an RSS feed for the latest tweet containing the specified keyword.
  - Query Parameters:
    - `minLikes`: Minimum number of likes (optional).
    - `minReplies`: Minimum number of replies (optional).
    - `minRetweets`: Minimum number of retweets (optional).
    - `language`: Language of the tweets (optional, default is "en").
  - Response: RSS feed in XML format.

- **GET** `/random/search`
  - Description: Search for tweets containing a random keyword from `keywords.json`.
  - Query Parameters:
    - `minLikes`: Minimum number of likes (optional).
    - `minReplies`: Minimum number of replies (optional).
    - `minRetweets`: Minimum number of retweets (optional).
    - `language`: Language of the tweets (optional, default is "en").
  - Response: JSON object with the latest tweet containing the random keyword.

### Strict Search Tweets

- **GET** `/strict-search/:keyword`
  - Description: Strict search for tweets containing the specified keyword.
  - Query Parameters:
    - `minLikes`: Minimum number of likes (optional).
    - `minReplies`: Minimum number of replies (optional).
    - `minRetweets`: Minimum number of retweets (optional).
    - `language`: Language of the tweets (optional, default is "en").
  - Response: JSON object with the latest tweet containing the keyword.

- **GET** `/strict-search/:keyword/feed`
  - Description: Generate an RSS feed for the latest tweet containing the specified keyword.
  - Query Parameters:
    - `minLikes`: Minimum number of likes (optional).
    - `minReplies`: Minimum number of replies (optional).
    - `minRetweets`: Minimum number of retweets (optional).
    - `language`: Language of the tweets (optional, default is "en").
  - Response: RSS feed in XML format.

### Hashtag Tweets

- **GET** `/hashtag/:keyword`
  - Description: Search for tweets containing the specified hashtag.
  - Query Parameters:
    - `minLikes`: Minimum number of likes (optional).
    - `minReplies`: Minimum number of replies (optional).
    - `minRetweets`: Minimum number of retweets (optional).
    - `language`: Language of the tweets (optional, default is "en").
  - Response: JSON object with the latest tweet containing the hashtag.

- **GET** `/hashtag/:keyword/feed`
  - Description: Generate an RSS feed for the latest tweet containing the specified hashtag.
  - Query Parameters:
    - `minLikes`: Minimum number of likes (optional).
    - `minReplies`: Minimum number of replies (optional).
    - `minRetweets`: Minimum number of retweets (optional).
    - `language`: Language of the tweets (optional, default is "en").
  - Response: RSS feed in XML format.

- **GET** `/random/hashtag`
  - Description: Search for tweets containing a random hashtag from `keywords.json`.
  - Query Parameters:
    - `minLikes`: Minimum number of likes (optional).
    - `minReplies`: Minimum number of replies (optional).
    - `minRetweets`: Minimum number of retweets (optional).
    - `language`: Language of the tweets (optional, default is "en").
  - Response: JSON object with the latest tweet containing the random hashtag.

### User Profile Information

- **GET** `/profile-information/:username`
  - Description: Get profile information of the specified user.
  - Response: JSON object with the user's profile information.

- **GET** `/profile-information/:username/feed`
  - Description: Generate an RSS feed for the user's profile information.
  - Response: RSS feed in XML format.

### User's Latest Tweet

- **GET** `/latest-tweet/:username`
  - Description: Get the latest tweet of the specified user.
  - Query Parameters:
    - `minLikes`: Minimum number of likes (optional).
    - `minReplies`: Minimum number of replies (optional).
    - `minRetweets`: Minimum number of retweets (optional).
    - `language`: Language of the tweets (optional, default is "en").
  - Response: JSON object with the user's latest tweet.

- **GET** `/latest-tweet/:username/feed`
  - Description: Generate an RSS feed for the user's latest tweet.
  - Query Parameters:
    - `minLikes`: Minimum number of likes (optional).
    - `minReplies`: Minimum number of replies (optional).
    - `minRetweets`: Minimum number of retweets (optional).
    - `language`: Language of the tweets (optional, default is "en").
  - Response: RSS feed in XML format.

- **GET** `/random/user-latest`
  - Description: Get the latest tweet of a random user from `keywords.json`.
  - Query Parameters:
    - `minLikes`: Minimum number of likes (optional).
    - `minReplies`: Minimum number of replies (optional).
    - `minRetweets`: Minimum number of retweets (optional).
    - `language`: Language of the tweets (optional, default is "en").
  - Response: JSON object with the latest tweet of the random user.

## Project Structure

```
TwitterOpenAPI/
│
├── controllers/
│ ├── searchController.js
│ ├── profileInfoController.js
│ ├── strictSearchController.js
│ ├── hashtagController.js
│ └── userTweetController.js
│
├── routes/
│ ├── search.js
│ ├── profile-info.js
│ ├── strict-search.js
│ ├── hashtag.js
│ └── username-latest.js
│
├── config/
│ └── config.js
│
├── app.js
└── package.json
```

### Main Application File

- **app.js**: The main entry point of the application.

### Controllers

- **searchController.js**: Handles search-related requests.
  - `searchTweets`: Fetches tweets containing the specified keyword.
  - `searchTweetsFeed`: Generates an RSS feed for the latest tweet containing the specified keyword.
  - `randomSearchTweets`: Fetches tweets containing a random keyword from `keywords.json`.

- **profileInfoController.js**: Handles profile information-related requests.
  - `getProfileInfo`: Fetches profile information of the specified user.
  - `getProfileInfoFeed`: Generates an RSS feed for the user's profile information.

- **strictSearchController.js**: Handles strict search-related requests.
  - `strictSearchTweets`: Fetches tweets containing the specified keyword using strict search.
  - `strictSearchTweetsFeed`: Generates an RSS feed for the latest tweet containing the specified keyword using strict search.

- **hashtagController.js**: Handles hashtag-related requests.
  - `getHashtagTweets`: Fetches tweets containing the specified hashtag.
  - `getHashtagTweetsFeed`: Generates an RSS feed for the latest tweet containing the specified hashtag.
  - `randomHashtagTweets`: Fetches tweets containing a random hashtag from `keywords.json`.

- **userTweetController.js**: Handles user tweet-related requests.
  - `getUserLatestTweet`: Fetches the latest tweet of the specified user.
  - `getUserLatestTweetFeed`: Generates an RSS feed for the user's latest tweet.
  - `randomUserLatestTweet`: Fetches the latest tweet of a random user from `keywords.json`.

### Routes

- **search.js**: Defines routes for search-related requests.
- **profile-info.js**: Defines routes for profile information-related requests.
- **strict-search.js**: Defines routes for strict search-related requests.
- **hashtag.js**: Defines routes for hashtag-related requests.
- **username-latest.js**: Defines routes for user tweet-related requests.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.