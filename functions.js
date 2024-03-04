document.addEventListener('DOMContentLoaded', function() {
    const studentsTable = document.getElementById('usersTable');
    const students = JSON.parse(localStorage.getItem('students')) || [];

    const refreshTable = () => {
        studentsTable.innerHTML = ''; 
        students.forEach((student, index) => {
            const row = studentsTable.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);
            const cell6 = row.insertCell(5);
            const cell7 = row.insertCell(6);

            cell1.innerHTML = index + 1;
            cell2.innerHTML = student.cours;
            cell3.innerHTML = student.name;
            cell4.innerHTML = student.tz;
            cell5.innerHTML = student.date;
            cell6.innerHTML = '<button type="button" class="btn btn-info">Creation de carte</button>';
            cell7.innerHTML = `<button type="button" class="btn btn-danger" data-id="${student.id}">X</button>`;

            cell6.children[0].addEventListener('click', function() {
                showStudentCard(student);
            });
            cell7.children[0].addEventListener('click', function() {
                deleteStudent(student.id);
            });
        });
    };

   refreshTable();

    if (!localStorage.getItem('students')) {
        localStorage.setItem('students', JSON.stringify(exampleStudent));
    }
    const addButton = document.querySelector('button[type="submit"]');
    if (addButton) {
        addButton.addEventListener('click', function(event) {
            event.preventDefault(); 
            addStudent();
        });
    } else {
        console.log('Add button not found');
    }
    const closeButton = document.querySelector('.btn-secondary');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            closeLb(); 
        });
    }
});

function addStudent() {
    const studentName = document.getElementById('student_name') ? document.getElementById('student_name').value : '';
    const studentCours = document.getElementById('student_cours') ? document.getElementById('student_cours').value : '';
    const studentTz = document.getElementById('student_tz') ? document.getElementById('student_tz').value : '';
    const studentDate = document.getElementById('student_date') ? document.getElementById('student_date').value : '';


    const student = {
        id: Date.now(),
        name: studentName,
        cours: studentCours,
        tz: studentTz,
        date: studentDate
    };

    let students = JSON.parse(localStorage.getItem('students')) || [];

    students.push(student);

    localStorage.setItem('students', JSON.stringify(students));


    alert('Etudiant bien ajouté !');
    window.location.href = 'listUser.html';
}
function deleteStudent(studentId) {
    const isConfirmed = confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?");
    if (!isConfirmed) {
        return;
    }


    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.filter(student => student.id !== studentId);
    localStorage.setItem('students', JSON.stringify(students));

    document.location.reload(true);
}

function showStudentCard(student) {
    const lightBox = document.querySelector('.lightBox');
    const cardBody = lightBox.querySelector('.card-body');
    cardBody.querySelector('.card-title').textContent = 'Carte étudiant';
    cardBody.querySelector('.card-text.mb-2').textContent = `Formation: ${student.cours}`;
    cardBody.querySelector('.card-text.mb-0').textContent = student.name;
    cardBody.querySelector('.card-text.m-0').textContent = `ID: ${student.tz}`;
    cardBody.querySelector('.card-text small').textContent = `Valable ${student.date}`;

    lightBox.style.display = 'flex'; 
}

function closeLb() {
    const lightBox = document.querySelector('.lightBox');
    lightBox.style.display = 'none'; 
}
