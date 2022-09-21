function deleteBook(id) {
  fetch('/'+id, {method: 'delete'})
    .then((res) => {
      if (res.ok) {
        alert('삭제되었습니다.');
      } else {
        alert('오류가 발생하였습니다.');
      }
    })
    .catch((err) => {
      console.error(err);
      alert('오류가 발생하였습니다.');
    });
}

const deleteBook1 = async function(id) {
  const dbook = await axios.delete('/'+id);
}