from flask import Flask, jsonify, request

app = Flask(__name__)

# In-memory storage for posts, stories, likes, and comments
posts = []
stories = []
likes = {}
comments = {}

# Routes
@app.route('/posts', methods=['GET', 'POST'])
def handle_posts():
    if request.method == 'GET':
        return jsonify(posts)
    elif request.method == 'POST':
        new_post = request.json
        posts.append(new_post)
        return jsonify(new_post), 201

@app.route('/stories', methods=['GET', 'POST'])
def handle_stories():
    if request.method == 'GET':
        return jsonify(stories)
    elif request.method == 'POST':
        new_story = request.json
        stories.append(new_story)
        return jsonify(new_story), 201

@app.route('/likes', methods=['GET', 'POST'])
def handle_likes():
    if request.method == 'GET':
        return jsonify(likes)
    elif request.method == 'POST':
        data = request.json
        post_id = data.get('postId')
        user_id = data.get('userId')
        if post_id not in likes:
            likes[post_id] = []
        likes[post_id].append(user_id)
        return '', 201

@app.route('/comments', methods=['GET', 'POST'])
def handle_comments():
    if request.method == 'GET':
        return jsonify(comments)
    elif request.method == 'POST':
        data = request.json
        post_id = data.get('postId')
        user_id = data.get('userId')
        comment = data.get('comment')
        if post_id not in comments:
            comments[post_id] = []
        comments[post_id].append({'userId': user_id, 'comment': comment})
        return '', 201

if __name__ == '__main__':
    app.run(debug=True)
