import streamlit as st
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(dotenv_path='../.env')

# Get the BASE_URL value
base_url = os.getenv('BASE_URL')


def generate_url(function, params, response_format):
    # base_url = "http://localhost:3003"
    if function == "Search":
        url = f"{base_url}/search/{params['keyword']}"
    elif function == "Strict Search":
        url = f"{base_url}/strict-search/{params['keyword']}"
    elif function == "Profile Search":
        url = f"{base_url}/profile-information/{params['username']}"
    elif function == "Hashtag":
        url = f"{base_url}/hashtag/{params['keyword']}"
    elif function == "User's Latest":
        url = f"{base_url}/latest-tweet/{params['username']}"
    else:
        return "Invalid function"

    if response_format == "FEED/RSS":
        url += "/feed"

    query_params = []
    if function != "Profile Search":
        if params['min_likes']:
            query_params.append(f"minLikes={params['min_likes']}")
        if params['min_replies']:
            query_params.append(f"minReplies={params['min_replies']}")
        if params['min_retweets']:
            query_params.append(f"minRetweets={params['min_retweets']}")
        if params['language']:
            query_params.append(f"language={params['language']}")

    if query_params:
        url += "?" + "&".join(query_params)

    return url


# Streamlit UI
st.title("XOpenAPI - URL Creator Tool")

function = st.selectbox("Select Function", [
    "Search", "Strict Search", "Profile Search", "Hashtag", "User's Latest"
])

response_format = st.radio("Select Response Format", ["JSON", "FEED/RSS"])

params = {
    "username": "",
    "keyword": "",
    "min_likes": "",
    "min_replies": "",
    "min_retweets": "",
    "language": ""
}

if function == "Profile Search":
    params['username'] = st.text_input(
        "Username", value="", placeholder="Enter username")
    if not params['username']:
        st.warning("Username is required for Profile Search")
elif function == "User's Latest":
    params['username'] = st.text_input(
        "Username", value="", placeholder="Enter username")
    params['min_likes'] = st.text_input(
        "Min Likes", value="", placeholder="Enter minimum likes")
    params['min_replies'] = st.text_input(
        "Min Replies", value="", placeholder="Enter minimum replies")
    params['min_retweets'] = st.text_input(
        "Min Retweets", value="", placeholder="Enter minimum retweets")
    params['language'] = st.text_input(
        "Language", value="", placeholder="Enter language")
    if not params['username']:
        st.warning("Username is required for User's Latest")
else:
    params['keyword'] = st.text_input(
        "Keyword", value="", placeholder="Enter keyword")
    params['min_likes'] = st.text_input(
        "Min Likes", value="", placeholder="Enter minimum likes")
    params['min_replies'] = st.text_input(
        "Min Replies", value="", placeholder="Enter minimum replies")
    params['min_retweets'] = st.text_input(
        "Min Retweets", value="", placeholder="Enter minimum retweets")
    params['language'] = st.text_input(
        "Language", value="", placeholder="Enter language")
    if not params['keyword']:
        st.warning("Keyword is required for this function")

if st.button("Generate URL"):
    if (function == "Profile Search" and params['username']) or (function != "Profile Search" and params['keyword']):
        url = generate_url(function, params, response_format)
        st.write("Generated URL:", url)
    else:
        st.error("Please fill in all required fields")

# Example URLs
st.write("## Example URLs")
st.write("### Search Example")
st.write("##### JSON")
st.write("http://base.url/search/example_keyword?minLikes=10&minReplies=5&minRetweets=2&language=en")
st.write("##### FEED/RSS")
st.write("http://base.url/search/example_keyword/feed?minLikes=10&minReplies=5&minRetweets=2&language=en")
st.write("### Strict Search Example")
st.write("##### JSON")
st.write("http://base.url/strict-search/example_keyword?minLikes=10&minReplies=5&minRetweets=2&language=en")
st.write("##### FEED/RSS")
st.write("http://base.url/strict-search/example_keyword/feed?minLikes=10&minReplies=5&minRetweets=2&language=en")
st.write("### Profile Search Example")
st.write("##### JSON")
st.write("http://base.url/profile-information/example_user")
st.write("##### FEED/RSS")
st.write("http://base.url/profile-information/example_user/feed")
st.write("### Hashtag Example")
st.write("##### JSON")
st.write("http://base.url/hashtag/example_keyword?minLikes=10&minReplies=5&minRetweets=2&language=en")
st.write("##### FEED/RSS")
st.write("http://base.url/hashtag/example_keyword/feed?minLikes=10&minReplies=5&minRetweets=2&language=en")
st.write("### User's Latest Example")
st.write("##### JSON")
st.write("http://base.url/latest-tweet/example_user?minLikes=10&minReplies=5&minRetweets=2&language=en")
st.write("##### FEED/RSS")
st.write("http://base.url/latest-tweet/example_user/feed?minLikes=10&minReplies=5&minRetweets=2&language=en")
