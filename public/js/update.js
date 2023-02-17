const updateBtn = document.querySelector('#update');

updateBtn.addEventListener('click', async (e) => {
    let event = e.target;
    let postId = event.parentElement.getAttribute('id');

    let newTitle = document.querySelector('#updatedTitle').value;
    let newContent = document.querySelector('#updatedContent').value;


    const response = await fetch(`/dashboard/edit-post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: newTitle,
            content: newContent,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to update post.');
    }
})