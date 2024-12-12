document.addEventListener('DOMContentLoaded', () => {
  // Lấy các phần tử HTML
  const taskMain = document.getElementById('task_main');
  const projectNameInput = document.getElementById('project_name');
  const addProjectButton = document.getElementById('add_project_button');
  const projectList = document.querySelector('.project_list');

  // Mảng chứa danh sách dự án
  let projects = [];

  // Hàm upload file lên API
  

  // Hàm hiển thị danh sách dự án
  function renderProjectList() {
    projectList.innerHTML = '';
    projects.forEach((project, index) => {
      const projectItem = document.createElement('div');
      projectItem.classList.add('project');
      projectItem.innerHTML = `
        <div class="project-header">
          <h2>${project.name}</h2>
          <select class="progress-select">
            <option value="completed" ${project.progress === 'completed' ? 'selected' : ''}>Completed</option>
            <option value="uncompleted" ${project.progress === 'uncompleted' ? 'selected' : ''}>Uncompleted</option>
          </select>
          <select class="level-select">
            <option value="high" ${project.level === 'high' ? 'selected' : ''}>High</option>
            <option value="medium" ${project.level === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="low" ${project.level === 'low' ? 'selected' : ''}>Low</option>
          </select>
          <button class="delete-button">Delete</button>
        </div>
        <div class="project-note">
          <label for="note-${index}">Note:</label>
          <textarea id="note-${index}" class="note-input">${project.note || ''}</textarea>
        </div>
        <div class="project-upload">
          <div class="file-upload-wrapper">
            <input type="file" id="file-upload-${index}" class="file-upload" multiple />
            <span class="custom-file-label">Choose Files</span>
          </div>
          <div class="file-list">
            ${project.files.map(file => `<span>${file.name} (${file.url})</span>`).join('<br>')}
          </div>
        </div>
        <button class="save-button">Save</button>
      `;
      projectList.appendChild(projectItem);

      // Xử lý upload file
      projectItem.querySelector('.file-upload').addEventListener('change', async (e) => {
        const uploadedFiles = Array.from(e.target.files);
        try {
          const uploadedLinks = await Promise.all(uploadedFiles.map(uploadFileToAPI));
          uploadedFiles.forEach((file, i) => {
            project.files.push({ name: file.name, url: uploadedLinks[i] });
          });
          renderProjectList(); // Cập nhật lại danh sách dự án sau khi upload
        } catch (error) {
          alert('Failed to upload one or more files');
        }
      });

      // Xử lý nút Save
      projectItem.querySelector('.save-button').addEventListener('click', () => {
        project.note = projectItem.querySelector('.note-input').value;
        project.progress = projectItem.querySelector('.progress-select').value;
        project.level = projectItem.querySelector('.level-select').value;
        
        saveProjectsToDatabase(); // Cập nhật database

        renderProjectList();



      });




      // Xử lý nút Delete
      projectItem.querySelector('.delete-button').addEventListener('click', () => {
        projects.splice(index, 1);
        renderProjectList();
      });
    });
  }

  // Hàm thêm dự án mới
  function addProject() {
    const projectName = projectNameInput.value.trim();
    if (projectName) {
      const newProject = {
        name: projectName,
        progress: 'uncompleted',
        level: 'low',
        note: '',
        files: [], // Danh sách file sẽ lưu trữ { name, url }
      };
      projects.push(newProject);
      projectNameInput.value = '';
      renderProjectList();
    }
  }

  // Lắng nghe sự kiện click nút Add Project
  addProjectButton.addEventListener('click', addProject);
});

// save to database
async function saveProjectsToDatabase() {
  const username = localStorage.getItem('username'); // Lấy username từ localStorage

  

  const payload = {
    username,
    projects,
  };

  try {
    const response = await fetch('https://back-end-ocean.up.railway.app/project/update', { // Thay '/api/save-projects' bằng URL của API backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to save projects');
    }

    const result = await response.json();
    alert('Projects saved successfully');
    
  } catch (error) {
    
    alert('Failed to save projects');
  }
}

// upload file to API
async function uploadFileToAPI(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('https://back-end-ocean.up.railway.app/storage/upload', { // Thay bằng API upload của bạn
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to upload file');
    }
    const data = await response.json();
    return data.url; // Định dạng trả về: { url: "https://example.com/file.jpg" }
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

