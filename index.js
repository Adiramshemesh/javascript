var request = require('request');

const URL = 'https://jsonplaceholder.typicode.com/posts/';

module.exports = {
    getPost, getPosts
};


function getPosts() {
    return new Promise((resolve, reject) => {
        try {
            req(URL).then(async function (data) {
                    var posts = [];
                    for (var i = 0; i < data.length; i++) {
                        posts[i] = getComments(data[i]);
                    }
                    return Promise.all(posts).then(getComments(posts)).then(res => {
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


async function getPost(_id) {
    return new Promise(async(resolve, reject) => {
        try {
            var id;
            if ( process.argv[2])
            {   id=process.argv[2];}
            else {id= _id;}

        //  var id = process.argv[1] || _id;
          console.log(id);
        var post = await req(URL + id);
        var comments = await req(URL + id + '/comments');
        post.comments = comments;
        // if(comments.length===0 )//&& post.length===0)
        //     return reject("not founded post or comments");
        console.log(JSON.stringify(post));
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
            var comments = await req(URL + data.id + '/comments');
            data.comments = comments;
          //  if(comments.length===0)
          //      return reject("not founded comments");
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
                // if(body.length===0)
                //     return reject("not founded data");
                return resolve(JSON.parse(body));
            });
        }
        catch (error) {
            console.log(error);
            return reject(error);
        }
    });
}


async function main() {
    //var data = await getPosts();
    //  var data2= await getPost(9);
}

main();
