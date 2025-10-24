
//  • Ex 4 — Promise Chain Practice 
// • Goal: Convert callback logic to Promises. 
// • Task: 
// • Create three functions returning Promises:
//  • fetchUser() → resolves {id: 1, name: "Alice"}
//  • fetchPosts(userId) → resolves an array of posts
//  • displayPosts(posts) → logs post titles Chain them 
// with .then() calls.




function getUser() {
  log("Bước 1. Gọi getUser()");
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = { id: 1, name: "Lam" };
      log("User: " + user.name);
      resolve(user);
    }, 400);
  });
}

function getPosts(userId) {
  log("Bước 2. Gọi getPosts(" + userId + ")");
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = [
        { id: 101, title: "Post A" },
        { id: 102, title: "Post B" },
      ];
      log("Posts: " + posts.map((p) => p.title).join(", "));
      resolve(posts);
    }, 400);
  });
}

function getPostDetail(postId) {
  log("Bước 3. Gọi getPostDetail(" + postId + ")");
  return new Promise((resolve) => {
    setTimeout(() => {
      const detail = { id: postId, title: "Chi tiết bài viết " + postId };
      log("Detail: " + detail.title);
      resolve(detail);
    }, 400);
  });
}


