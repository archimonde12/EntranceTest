let db = firebase.firestore()
const KEY_BOOKS_COLLECTION = "MyBooks"
let booklist = []

let addBookForm = document.getElementById("addBookForm")
addBookForm.onsubmit = function (event) {
    event.preventDefault();
    //Lấy dữ liệu từ form
    let bookname = addBookForm.bookname.value.trim()
    let author = addBookForm.author.value.trim()

    //Check valid
    let validateResult = [
        validate(bookname != '', 'bookname-error', 'Không được để trống tên sách'),
        validate(author != '', 'author-error', 'Không được để trống tên tác giả')
    ]

    if (isPassed(validateResult)) {
        addBookToFireStore(bookname, author)
    }
}


addBookToFireStore = async function (bookname, author) {
    try {
        //Lấy dữ liệu
        let newBook = {
            bookname: bookname,
            author: author,
            createAt: new Date(),
            status:"Chưa đọc"
        }
        //push lên pendingIdeas
        await db.collection(KEY_BOOKS_COLLECTION).add(newBook)
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
        //Thông báo thành công
        console.log("Đẩy lên thành công " + newBook)

    } catch (error) {
        console.log(error);
    }
}



saveBookList = async function () {
    try {
        let result = await firebase.firestore()
            .collection(KEY_BOOKS_COLLECTION) //nơi lấy dữ liệu
            .get() //Thực hiện
        for (let book of result.docs) {
            booklist.push(refineData(book))
        }
        console.log(booklist)
    } catch (error) {
        console.log(error)
    }
}

showBookList =async function () {
    // await saveBookList();
    let readBookList = document.getElementById("readBookList")
    readBookList.innerHTML = `
    <tr>
        <th>STT</th>
        <th>Tên sách</th>
        <th>Tác giả</th>
        <th>Trạng thái </th>
    </tr>
    `
    booklist.forEach((value, index) => {
        readBookList.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${value.bookname} </td>
            <td>${value.author}</td>
            <td>${value.status}</td>
        </tr>
        `
    })
}
showBookList()


function refineData(rawData) {
    let data = rawData.data()
    data.id = rawData.id
    return data
}


// Kiểm tra để báo lỗi
validate = function (condition, errortag, message) {
    if (!condition) {
        // document.getElementById(errortag).innerHTML = message
        setText(errortag, message)
        return false
    } else {
        // document.getElementById(errortag).innerHTML = ''
        setText(errortag, '')
        return true
    }
}

setText = function (tagId, text) {
    if (document.getElementById(tagId) == null) return;
    document.getElementById(tagId).innerHTML = text
}

// trả về true nếu mọi giá trị trong mảng đúng và ngược lại
function isPassed(validateResult) {
    let isFail = validateResult.includes(false)
    if (isFail == true) {
        return false
    }
    return !isFail

}
listenForRealTimeUpdate = function () {
    db.collection(KEY_BOOKS_COLLECTION)
        .onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(async function (change) {
                if (change.type === "added") {
                    console.log("New book: ", change.doc.data());
                    booklist.push(change.doc.data())
                    showBookList()
                    
                }
                if (change.type === "modified") {
                    console.log("Modified book: ", change.doc.data());
             
                }
                if (change.type === "removed") {
                    console.log("Removed book: ", change.doc.data());
              
                }
            });
        });
}

listenForRealTimeUpdate()
// MAIN PROGRAM
