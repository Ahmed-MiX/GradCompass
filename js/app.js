let careersData = JSON.parse(localStorage.getItem('careersDB'));
if (!careersData) {
    careersData = [
        { id: 1, title: "محلل بيانات", major: "علوم الحاسب", demand: "عالٍ" },
        { id: 2, title: "مهندس برمجيات", major: "هندسة البرمجيات", demand: "عالٍ" },
        { id: 3, title: "أخصائي أمن سيبراني", major: "نظم المعلومات", demand: "عالٍ جداً" }
    ];
    localStorage.setItem('careersDB', JSON.stringify(careersData));
}

const exploreBtn = document.querySelector("a[href='careers.html'] button");
if (exploreBtn) {
    exploreBtn.parentElement.addEventListener('click', function() {
        const major = document.getElementById("major-select").value;
        localStorage.setItem('selectedMajor', major);
    });
}


const careersList = document.getElementById("careersList");
const searchInput = document.getElementById("searchInput");

function displayCareers(filterText = "") {
    if (!careersList) return;
    careersList.innerHTML = "";
    
    const selectedMajor = localStorage.getItem('selectedMajor');
    let filtered = careersData;
    

    if (selectedMajor && selectedMajor !== "") {
        filtered = filtered.filter(c => c.major === selectedMajor);
    }
    

    if (filterText !== "") {
        filtered = filtered.filter(c => c.title.includes(filterText));
    }

    if (filtered.length === 0) {
        careersList.innerHTML = "<p>لا توجد مسارات مطابقة.</p>";
        return;
    }

    filtered.forEach(c => {
        careersList.innerHTML += `
            <div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 15px; border-radius: 5px; background-color: #fafafa;">
                <h3 style="color: #13294B; margin-top: 0;">${c.title}</h3>
                <p>مستوى الطلب: <strong>${c.demand}</strong></p>
                <a href="roadmap.html"><button>عرض خارطة الطريق</button></a>
            </div>
        `;
    });
}

if (careersList) {
    displayCareers();
    searchInput.addEventListener('input', (e) => displayCareers(e.target.value));
}

const loginBtn = document.getElementById("loginBtn");
const dashboardSection = document.getElementById("dashboardSection");
const loginSection = document.getElementById("loginSection");

if (loginBtn) {
    dashboardSection.style.display = "none";

    loginBtn.addEventListener('click', function() {
        const user = document.getElementById("adminUser").value;
        const pass = document.getElementById("adminPass").value;
       
        if (user === "admin" && pass === "123") {
            loginSection.style.display = "none";
            dashboardSection.style.display = "block";
            renderTable();
        } else {
            alert("بيانات الدخول خاطئة. جرب: admin / 123");
        }
    });
}

function renderTable() {
    const tbody = document.getElementById("adminJobsList");
    if (!tbody) return;
    tbody.innerHTML = "";
    careersData.forEach((c, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${c.title}</td>
                <td>${c.demand}</td>
                <td><button style="background-color: red; border: none; padding: 5px 10px;" onclick="deleteJob(${c.id})">حذف</button></td>
            </tr>
        `;
    });
}

function deleteJob(id) {
    careersData = careersData.filter(c => c.id !== id);
    localStorage.setItem('careersDB', JSON.stringify(careersData));
    renderTable();
}

const addJobBtn = document.getElementById("addJobBtn");
if (addJobBtn) {
    addJobBtn.addEventListener('click', function() {
        const title = document.getElementById("newJobTitle").value;
        const demand = document.getElementById("newJobDemand").value;
        
        if (title.trim() === "") {
            alert("يرجى إدخال المسمى الوظيفي!");
            return;
        }

        careersData.push({
            id: Date.now(), 
            title: title,
            major: "عام",
            demand: demand
        });
        
        localStorage.setItem('careersDB', JSON.stringify(careersData));
        renderTable();
        document.getElementById("newJobTitle").value = "";
    });
}