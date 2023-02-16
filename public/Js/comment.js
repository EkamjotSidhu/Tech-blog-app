const commentCard = document.querySelector('#addComment');

// render add comment form
commentCard.addEventListener('click', (e) => {
    e.preventDefault();

    let card = document.querySelector('#comment');
    card.classList.remove('d-none');
});

const addCommentBtn = document.querySelector('#commentBtn');

addCommentBtn.addEventListener('click', async (e) => {
    let comment = document.querySelector('#commentValue').value;
    let postId = document.querySelector('#postTitle').parentElement.getAttribute('id');
    let userId = document.querySelector('#userId').getAttribute('data-number');

    if (comment && postId && userId) {
        const response = await fetch('/single-post', {
            method: 'POST',
            body: JSON.stringify({
                comment: comment,
                user_id: userId,
                posts_id: postId
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment');
            return;
        }
    }
})