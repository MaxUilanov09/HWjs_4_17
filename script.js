const student_body = document.querySelector('#students-table-body');

function getStudents() {
    const data = fetch('https://maxuilanov09.github.io/HWjs_4_17/students.json')
        .then(res => res.json())
        .then(data => renderStudents(data.students));
    console.log('c', data);
    return data;
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

function addStudent(e) {

}

function updateStudent(id) {

}

function deleteStudent(id) {

}