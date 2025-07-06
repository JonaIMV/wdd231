document.addEventListener("DOMContentLoaded", function () {
    // Navbar y año
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const yearSpan = document.querySelector("#year");
    const lastModSpan = document.querySelector("#lastModified");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("show");
        });
    }

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    if (lastModSpan) {
        lastModSpan.textContent = `Last modified: ${document.lastModified}`;
    }

    // Array de cursos
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: '',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: '',
            technology: ['HTML', 'CSS'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: '',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: '',
            technology: ['C#'],
            completed: false
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: '',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: '',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: false
        }
    ];

    // Selección de elementos
    const courseContainer = document.getElementById("courseContainer");
    const totalCredits = document.getElementById("totalCredits");
    const filterButtons = document.querySelectorAll(".filter");

    // Función para renderizar tarjetas simples
    function renderCourses(coursesArray) {
        courseContainer.innerHTML = "";

        coursesArray.forEach(course => {
            const card = document.createElement("div");
            card.classList.add("course-card");
            if (course.completed) {
                card.classList.add("completed");
                card.textContent = `✓ ${course.subject} ${course.number}`;
            } else {
                card.textContent = `${course.subject} ${course.number}`;
            }
            courseContainer.appendChild(card);
        });

        // Actualizar recuento de cursos mostrados
        totalCredits.textContent = `The total number of courses listed below is ${coursesArray.length}`;
    }

    // Mostrar todos al cargar
    renderCourses(courses);

    // Filtrar por botones
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const category = button.getAttribute("data-category");
            let filteredCourses;
            if (category === "all") {
                filteredCourses = courses;
            } else {
                filteredCourses = courses.filter(course => course.subject.toLowerCase() === category);
            }
            renderCourses(filteredCourses);
        });
    });
});
