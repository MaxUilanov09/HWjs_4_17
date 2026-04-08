function getStudents() {
    const data = fetch('https://raw.githubusercontent.com/MaxUilanov09/HWjs_4_17/main/students.json').then(res => res.json())
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