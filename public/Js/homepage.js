const readMoreBtn = document.querySelectorAll('#readMore');

// redirect to single post page to view post and/or comment
readMoreBtn.forEach(button => {
    button.addEventListener('click', async (e) => {
        let event = e.target;
        let postId = event.parentElement.getAttribute('id');
        console.log(postId);

        if (postId) {
            document.location.replace(`/single-post/${postId}`);
        }
    })
});