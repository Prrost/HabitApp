const token = localStorage.getItem("token");

// Получение профиля
async function getProfile() {
    const response = await fetch("/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    document.getElementById("email").textContent = data.email;
}

// Получение привычек
async function getHabits() {
    const response = await fetch("/api/habits", {
        headers: { Authorization: `Bearer ${token}` }
    });
    const habits = await response.json();
    const habitList = document.getElementById("habitList");
    habitList.innerHTML = "";
    habits.forEach(habit => {
        const li = document.createElement("li");
        li.innerHTML = `${habit.title}:  <br><br>${habit.description} <br><br>
      <span> (Progress: <span id="progress-${habit._id}">${habit.progress}</span>)</span>
      <br><br><br>
       <button onclick="markAsDone('${habit._id}')">✔ Done</button>
      <button onClick="editHabit('${habit._id}', '${habit.title}', '${habit.description}')">Edit</button>
      <button onclick="deleteHabit('${habit._id}')">Delete</button>`;

        habitList.appendChild(li);
    });
}

// Добавление привычки
document.getElementById("habitForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("habitTitle").value;
    const description = document.getElementById("habitDescription").value;

    await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, description })
    });

    document.getElementById("habitForm").reset();
    getHabits();
});

// Удаление привычки
async function deleteHabit(id) {
    await fetch(`/api/habits/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    });
    getHabits();
}

function editHabit(id, currentTitle, currentDescription) {
    const newTitle = prompt("Enter new title:", currentTitle);
    const newDescription = prompt("Enter new description:", currentDescription);

    if (newTitle !== null && newDescription !== null) {
        fetch(`/api/habits/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ title: newTitle, description: newDescription })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                location.reload();  // Перезагружаем страницу, чтобы обновить список
            })
            .catch(error => console.error("Error:", error));
    }
}


function markAsDone(id) {
    const confirmAction = confirm("Are you sure you want to mark this habit as done?");
    if (!confirmAction) return;

    fetch(`/api/habits/${id}/progress`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById(`progress-${id}`).innerText = data.progress;
            } else {
                alert("Failed to update progress");
            }
        })
        .catch(error => console.error("Error:", error));
}

// Выход
function logout() {
    localStorage.removeItem("token");
    window.location.href = "/front/login";
}

// Инициализация данных
getProfile();
getHabits();