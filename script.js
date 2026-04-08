function getStudents() {
    const data = fetch('https://maxuilanov09.github.io/HWjs_4_17/students.json')
        .then(res => res.json())
    console.log('c', data)
    return data;
}

console.log('a', getStudents().then(x => console.log('b', x)));

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
            <th>${Obj}</th>
        </tr>
        `;

    })
}

function addStudent(e) {

}

function updateStudent(id) {

}

function deleteStudent(id) {

}