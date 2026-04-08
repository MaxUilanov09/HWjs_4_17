function getStudents() {
    const data = fetch('https://maxuilanov09.github.io/HWjs_4_17/students.json')
        .then(res => res.json())
    console.log('c', data)
    return data;
}

console.log('a', getStudents().then(x => x));

function renderStudents(students) {

}

function addStudent(e) {

}

function updateStudent(id) {

}

function deleteStudent(id) {

}