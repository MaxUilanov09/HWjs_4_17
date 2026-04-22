const student_body = document.querySelector('#students-table-body');
const form = document.querySelector('#add-student-form');

const BASE_URL = 'http://localhost:1235/students'; 

// run 'npm run server' and then 'live server' to work

let editFlag = false;
let editID = -1;

async function getStudents() {
    try {
        const res = await fetch(BASE_URL)
        const data = await res.json();
        renderStudents(data);
    } catch (error) {
        alert("Can't get the student data\nTry again later");
    }
}

async function renderStudents(students) {
    try {
        student_body.innerHTML = '';
        students.forEach(Obj => {
            let markup = `
            <tr>
                <th>${Obj.id}</th>
                <th>${Obj.name}</th>
                <th>${Obj.age}</th>
                <th>${Obj.course}</th>
                <th>${Obj.skills}</th>
                <th>${Obj.email}</th>
                <th>${Obj.isEnrolled}</th>
                <th>
                    <button type="button" data-id="${Obj.id}" class="students-button-delete">Видалити</button>
                    <button type="button" data-id="${Obj.id}" class="students-button-edit">Оновити</button>
                </th>
            </tr>
            `;
            student_body.innerHTML += markup;
        });
        document.querySelectorAll('.students-button-delete').forEach(x => {
            x.addEventListener('click', () => {
                deleteStudent(x.dataset.id);
            });
        });
        document.querySelectorAll('.students-button-edit').forEach(x => {
            x.addEventListener('click', () => {
                editStudent(x.dataset.id);
            });
        });
    } catch (error) {
        alert("Can't render students\nTry again later");
    }
}

async function eraseData() {
    try {
        Array(...form.children).forEach(elem => {
            if (elem.children.length !== 0) {
                if (elem.children.item(0).id === 'isEnrolled') {
                    elem.children.item(0).checked = false;
                }
                else {
                    elem.children.item(0).value = '';
                }
            }
        });
    } catch (error) {
        alert("Can't remove input data\nPlease reload the page");
    }
}

async function getData() {
    let dataObj = {};
    try {
        Array(...form.children).forEach(elem => {
            if (elem.children.length !== 0) {
                dataObj[elem.children.item(0).id] = (elem.children.item(0).id === 'isEnrolled') ? elem.children.item(0).checked : elem.children.item(0).value
            }
        });
    } catch (error) {
        alert("Can't get the data of the student\nTry again later");
    }
    return dataObj;
}

async function setData(Obj) {
    try {
        Array(...form.children).forEach(elem => {
            if (elem.children.length !== 0) {
                if (elem.children.item(0).id === 'isEnrolled') {
                    elem.children.item(0).checked = Obj[elem.children.item(0).id];
                }
                else {
                    elem.children.item(0).value = Obj[elem.children.item(0).id];
                }
            }
        });
    } catch (error) {
        alert("Can't set the student data for editing\nTry again later");
    }
}

async function addStudent() {
    let dataObj = await getData();
    try {
        fetch(BASE_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj)
        });
        getStudents();
    } catch (error) {
        alert("Can't add the student to the server\nPlease try again later");
    }
}

async function editStudent(id) {
    try {
        editFlag = true;
        editID = id;
        document.querySelector('#Add_button').textContent = 'Оновити студента';
        const res = await fetch(BASE_URL + `/${id}`)
        const data = await res.json();
        setData(data);
    } catch (error) {
        alert("Can't edit the student data\nPlease try again later");
    }
}

async function updateStudent(id) {
    let dataObj = await getData();
    try {
        fetch(BASE_URL + `/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj)
        });
        getStudents();
        eraseData();
        editFlag = false;
        editID = -1;
        document.querySelector('#Add_button').textContent = 'Додати студента';
    } catch (error) {
        alert("Can't update the student data\nPlease try again later");
    }
}

function buttonFunc() {
    if (editFlag) {
        updateStudent(editID);
    }
    else {
        addStudent();
    }
}

async function deleteStudent(id) {
    try {
        fetch(BASE_URL + `/${id}`, {
            method: "DELETE",
        });
        getStudents();
    } catch (error) {
        alert("Can't delete the student data\nPlease try again");
    }
}

form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    buttonFunc();
})