// display create post form
const addPostBtn = document.getElementById('addPostBtn');
// create post form
const form = document.getElementById('form');
const deleteBtn = document.querySelectorAll('#delete');

// display create new post form
addPostBtn.addEventListener('click', (e) => {
    addPostBtn.classList.add('d-none');
    form.classList.remove('d-none');
});

form.addEventListener('submit', createPost);

//  create new post and save to database
async function createPost(e) {
    e.preventDefault();

    let title = document.getElementById('titleInput').value.trim();
    let content = document.getElementById('contentInput').value.trim();
    // console.log("Title: ", title)
    // console.log("Content: ", content)

    addPostBtn.classList.remove('d-none');
    form.classList.add('d-none');

    if (title && content) {
        const response = await fetch('/dashboard/create-post', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                content: content,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
            console.log(response);
        } else {
            alert('Failed to create post');
            return;
        }
    }
}

deleteBtn.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        let event = e.target;
        let postId = event.parentElement.getAttribute('id');
        console.log('postid: ', postId);

        const response = await fetch(`/dashboard/delete/${postId}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to delete post');
          }

    })

})