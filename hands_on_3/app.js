import { courses } from "./data.js";

// -----------------------
// Task 1
// -----------------------

console.log(courses);

// Destructuring
courses.forEach(course => {
    const { name, credits } = course;
    console.log(`${name} - ${credits} credits`);
});

// map()
const courseList = courses.map(course =>
    `${course.code} - ${course.name} (${course.credits} credits)`
);

console.log(courseList);

// filter()
const filteredCourses = courses.filter(course => course.credits >= 4);

console.log(filteredCourses);

// reduce()
const totalCredits = courses.reduce(
    (total, course) => total + course.credits,
    0
);

console.log("Total Credits:", totalCredits);

// -----------------------
// Task 2 & Task 3
// -----------------------

const courseGrid = document.querySelector(".course-grid");
const totalCreditsText = document.getElementById("total-credits");
const searchInput = document.getElementById("search-courses");
const sortButton = document.getElementById("sort-btn");
const selectedCourse = document.getElementById("selected-course");

// Copy the array
let displayedCourses = [...courses];

// Render Function
function renderCourses(courseArray) {

    courseGrid.innerHTML = "";

    courseArray.forEach(course => {

        const article = document.createElement("article");

        article.className = "course-card";

        article.dataset.id = course.id;

        article.innerHTML = `
            <h3>${course.name}</h3>
            <p>Course Code: ${course.code}</p>
            <p>Credits: ${course.credits}</p>
        `;

        courseGrid.appendChild(article);

    });

    const total = courseArray.reduce(
        (sum, course) => sum + course.credits,
        0
    );

    totalCreditsText.textContent =
        `Total Credits Enrolled: ${total}`;
}

// Initial render
renderCourses(displayedCourses);

// -----------------------
// Search
// -----------------------

searchInput.addEventListener("input", () => {

    const searchText = searchInput.value.toLowerCase();

    displayedCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchText)
    );

    renderCourses(displayedCourses);

});

// -----------------------
// Sort
// -----------------------

sortButton.addEventListener("click", () => {

    displayedCourses.sort((a, b) => b.credits - a.credits);

    renderCourses(displayedCourses);

});

// -----------------------
// Event Delegation
// -----------------------

courseGrid.addEventListener("click", (event) => {

    const card = event.target.closest(".course-card");

    if (!card) return;

    const courseId = Number(card.dataset.id);

    const course = courses.find(c => c.id === courseId);

    selectedCourse.textContent =
        `Selected Course: ${course.name} | Grade: ${course.grade}`;

});