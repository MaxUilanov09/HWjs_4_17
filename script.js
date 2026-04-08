const student_body = document.querySelector('#students-table-body');
const form = document.querySelector('#add-student-form');

const BASE_URL = 'https://maxuilanov09.github.io/HWjs_4_17/students.json';
// const BASE_URL = 'http://localhost:1235/students';

let editFlag = false;
let editID = -1;

function getStudents() {
    fetch(BASE_URL)
        .then(res => res.json())
        .then(data => renderStudents(data.students));
}

function renderStudents(students) {
    console.log(students);
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
}

function eraseData() {
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
}

function getData() {
    let dataObj = {};
    Array(...form.children).forEach(elem => {
        if (elem.children.length !== 0) {
            dataObj[elem.children.item(0).id] = (elem.children.item(0).id === 'isEnrolled') ? elem.children.item(0).checked : elem.children.item(0).value
        }
    });
    return dataObj;
}

function setData(Obj) {
    console.log('o', Obj);
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
}

function addStudent() {
    let dataObj = getData();
    fetch(BASE_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObj)
    });
    getStudents();
}

function editStudent(id) {
    editFlag = true;
    editID = id;
    document.querySelector('#Add_button').textContent = 'Оновити студента';
    fetch(BASE_URL)
        .then(res => res.json())
        .then(data => setData(data.students.find(obj => obj.id === editID)));
}

function updateStudent(id) {
    let dataObj = getData();
    console.log('dataObj', dataObj);
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
}

function buttonFunc() {
    if (editFlag) {
        updateStudent(editID);
    }
    else {
        addStudent();
    }
}

function deleteStudent(id) {
    fetch(BASE_URL + `/${id}`, {
        method: "DELETE",
    });
    getStudents();
}

form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    buttonFunc();
})