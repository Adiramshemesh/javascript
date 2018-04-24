request = require('request');

const URL = 'https://jsonplaceholder.typicode.com/posts/';

module.exports = {
    getPost,
    getPosts
};


function getPosts() {
    return new Promise(async (resolve, reject) => {
        try {
            req(URL).then(async function (data) {
                    let posts = [];
                    for (let i = 0; i < data.length; i++) {
                        posts[i] = getComments(data[i]);
                    }
                    return Promise.all(posts).then(posts => getComments(posts)).then(res => {
                        console.log(JSON.stringify(res));
                        return resolve(posts.comments);
                    })
                }
            );
        }
        catch (error) {
            console.log(error);
            return reject(error);
        }
    });
}

function getPost(_id) {
    return new Promise(async (resolve, reject) => {
        try {
            let id = process.argv[1] || _id;
            let post = await req(URL + id);
            comments = await req(URL + id + '/comments');
            post.comments = comments;
            if (comments.length === 0)
                return reject("not founded comments");
            console.log(JSON.stringify(post));
            return resolve(post);

        }
        catch (error) {
            console.log(error);
            return reject(error);
        }
    });
}


async function getComments(data) {
    return new Promise(async (resolve, reject) => {
        try {
            comments = await req(URL + data.id + '/comments');
            data.comments = comments;
            return resolve(data);
        }
        catch (error) {
            console.log(error);
            return reject(error);
        }
    });
}

async function req(URL) {
    return new Promise((resolve, reject) => {
        try {
            request(URL, function (error, response, body) {
                if (body.length === 0)
                    return reject("not founded data");
                return resolve(JSON.parse(body));
            });
        }
        catch (error) {
            console.log(error);
            return reject(error);
        }
    });
}

