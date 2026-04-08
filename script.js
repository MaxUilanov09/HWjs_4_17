const student_body = document.querySelector('#students-table-body');
const form = document.querySelector('#add-student-form');

let editFlag = false;

function getStudents() {
    fetch('https://maxuilanov09.github.io/HWjs_4_17/students.json')
        .then(res => res.json())
        .then(data => renderStudents(data.students));
}

function renderStudents(students) {
    console.log(students);
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
            <th>-+-</th>
        </tr>
        `;
        student_body.innerHTML += markup;
    })
}

function getData() {
    let dataObj = {};
    Array(...form.children).forEach(elem => {
        if (elem.children.length !== 0) {
            dataObj[elem.children.item(0).id] = (elem.children.item(0).id === 'isEnrolled') ? elem.children.item(0).checked : elem.children.item(0).value
            if (elem.children.item(0).id === 'isEnrolled') {
                elem.children.item(0).checked = false;
            }
            else {
                elem.children.item(0).value = '';
            }
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
    fetch('https://maxuilanov09.github.io/HWjs_4_17/students.json', {
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
    fetch(`https://maxuilanov09.github.io/HWjs_4_17/students.json/${id}`)
        .then(res => res.json())
        .then(data => setData(data));
}

function updateStudent(id) {
    let dataObj = getData();
    console.log('dataObj', dataObj);
    fetch(`https://maxuilanov09.github.io/HWjs_4_17/students.json/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObj)
    });
    getStudents();
}

function deleteStudent(id) {

}