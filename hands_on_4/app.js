import { courses } from "./data.js";

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

// -----------------------
// Hands-On 4 - Task 1
// Using Promise (.then())
// -----------------------

function fetchUser(id) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
        .then(user => {
            console.log("User Name (.then()):", user.name);
        });
}

fetchUser(1);

// -----------------------
// Using async/await
// -----------------------

async function fetchUserAsync(id) {

    try {

        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        const user = await response.json();

        console.log("User Name (async/await):", user.name);

    } catch (error) {

        console.error(error);

    }

}

fetchUserAsync(2);

// -----------------------
// Simulate Network Delay
// -----------------------

function fetchAllCourses() {

    return new Promise(resolve => {

        setTimeout(() => {

            resolve(courses);

        }, 1000);

    });

}
const loading = document.getElementById("loading");

loading.style.display = "block";

fetchAllCourses().then(courseData => {

    loading.style.display = "none";

    renderCourses(courseData);

});
// -----------------------
// Promise.all()
// -----------------------

Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users/1").then(res => res.json()),
    fetch("https://jsonplaceholder.typicode.com/users/2").then(res => res.json())
])

.then(users => {

    console.log("User 1:", users[0].name);

    console.log("User 2:", users[1].name);

});

// -----------------------
// Task 2 - Fetch API
// -----------------------

const notificationList = document.getElementById("notification-list");
const retryButton = document.getElementById("retry-btn");

async function apiFetch(url) {

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to fetch data.");
    }

    return await response.json();
}

async function loadNotifications() {

    notificationList.innerHTML = "<p>Loading notifications...</p>";

    retryButton.style.display = "none";

    try {

        const posts = await apiFetch(
            "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );

        notificationList.innerHTML = "";

        posts.forEach(post => {

            notificationList.innerHTML += `
                <div class="notification-card">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                </div>
            `;

        });

    } catch (error) {

        notificationList.innerHTML = `
            <p style="color:red;">
                ${error.message}
            </p>
        `;

        retryButton.style.display = "inline-block";

    }

}

loadNotifications();

retryButton.addEventListener("click", () => {

    loadNotifications();

});

axios.interceptors.request.use(config => {

    console.log("API call started:", config.url);

    return config;

});

async function apiFetchAxios(url) {

    const response = await axios.get(url);

    return response.data;

}

async function loadAxiosNotifications() {

    try {

        const posts = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
                params: {
                    userId: 1
                }
            }
        );

        console.log(posts.data);

    } catch (error) {

        console.error(error);

    }

}

loadAxiosNotifications();

/*
Fetch vs Axios

1. Fetch requires response.json()
   Axios automatically converts JSON.

2. Fetch does not throw errors for HTTP status codes like 404.
   Axios automatically throws an error for non-2xx responses.

3. Fetch is built into modern browsers.
   Axios is an external library with extra features such as interceptors,
   request cancellation, and timeout support.
*/