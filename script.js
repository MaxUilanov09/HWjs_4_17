function getStudents() {
    const data = fetch('https://maxuilanov09.github.io/HWjs_4_17/students.json').then(res => res.json())
    return data;
}

console.log('a', getStudents());

function renderStudents(students) {

}

function addStudent(e) {

}

function updateStudent(id) {

}

function deleteStudent(id) {

}