//Vars
var posts = [];
var users = [{
    userid: 1,
    userFullName: "Alex Benedek"
}, {
    userid: 2,
    userFullName: "John Doe"
}, {
    userid: 3,
    userFullName: "Sarah Connor"
}]

var postOwner = users[0].userFullName;


var postTime = function() {
    return new Date();
}

// generate random ID function
function randomID(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    if (!length) {
        length = Math.floor(Math.random() * chars.length);
    }
    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}
// Empty the post input field after post
var clearInput = function() {
    $('#post-name').val("");
    console.log($('#post-name').val("")+"- cleared the post input box");
};

// Remove post
var removePost = function(deleteThis) {
    //$thispost = $(this).parents('.posts').find('.post');
    //  console.log(deleteThis);
    for (i = 0; i < posts.length; i++) {
        if (deleteThis == posts[i]['id']) {
            console.log("Deleting post: " + posts[i]['id']);
            posts.splice(i, 1);
        }
    }
};

// Post element HTML creation
var postelm = function(id, text, time, user,picurl) {
    var p1 = "<div class=\"thumbnail post\" data-id=\""+id+"\"><div class=\"postowner\">"+user+"</div><span class=\"time\">"+time+"</span><div class=\"posttext\">"+text+"</div><img src=\"https://unsplash.it/640/200\" >";
    var p2 = " <div class=\"caption\"><span class=\"glyphicon glyphicon-remove-circle deletePostIcon\"></span>";
    var p3 = "<span class=\"time\">" + time + "</span>";
    var p4 = "";
    var p5 = "<p><button data-id=\"" + id + "\" type=\"button\" class=\"btn btn-danger removepost\">Delete</button></p>";
    var p6 = "</div></div>";
    var posthtml = p1 + p2 + p6;

    return posthtml;
}

//  Create post function that inserts new posts to array posts
var newPost = function(post) {
    postID = randomID(8);
    posts.push({
        text: post,
        id: postID,
        time: Date(),
        user: postOwner
    });
    console.log("post "+this.postID+" pushed to array")
};

// Post the post on post click :)
$('.add-post').on('click', function() {

    if ($('#post-name').val().length > 0) {
        newPost($('#post-name').val())
        clearInput(); // empties the input of the last post text
        drawPosts();
        console.log("Posted");
    }
});
// Show the posts on the page
var drawPosts = function() {
    //remove previously posted posts;
    $(".posts").find('.post').remove();
    //loop the posts array and prepend the obects
    for (var i = 0; i < posts.length; i++) {
        $(".posts").prepend(postelm(posts[i].id, posts[i].text, posts[i].time,postOwner));
        //$('.posts').on('click','.post', function(){});
    }
}

// Delete post from screen and posts array
$('.posts').on('click', '.deletePostIcon', function() {
    var postToDelete = $(this).closest('.post')
    console.log(postToDelete);
    postToDelete.remove();
    removePost(postToDelete.data('id'))
});
//$(this).parents().closest('div').find('.thumbnail').remove();
// console.log("del button click");
//};


//$('.caption').on('click','span', function(){
//    console.log('delete post');
//   //console.log($(this).parents());
// }
//);
