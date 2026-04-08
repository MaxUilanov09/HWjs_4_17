const student_body = document.querySelector('#students-table-body');
const form = document.querySelector('#add-student-form');

function getStudents() {
    const dataS = fetch('https://maxuilanov09.github.io/HWjs_4_17/students.json')
        .then(res => res.json())
        .then(data => renderStudents(data.students))
        .then(data => {return data.students});
    console.log('c', dataS);
    return dataS;
}

function renderStudents(students) {
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

function addStudent() {
    let dataObj = {}
    Array(...form.children).forEach(elem => {
        console.log([elem, elem.children.length]);
        if (elem.children.length !== 0) {
            dataObj[elem.id] = elem.firstChild.value
        }
    });
    console.log('dataObj', dataObj);
    fetch('https://maxuilanov09.github.io/HWjs_4_17/students.json', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObj)
    });
    getStudents();
}

function updateStudent(id) {

}

function deleteStudent(id) {

}