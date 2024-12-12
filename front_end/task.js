document.addEventListener('DOMContentLoaded', () => {
  // Lấy các phần tử HTML
  const taskMain = document.getElementById('task_main');
  const projectNameInput = document.getElementById('project_name');
  const addProjectButton = document.getElementById('add_project_button');
  const projectList = document.querySelector('.project_list');

  // Mảng chứa danh sách dự án
  let projects = [];

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
            ${project.files.map(file => `<span>${file.name}</span>`).join(', ')}
          </div>
        </div>
        <button class="save-button">Save</button>
      `;
      projectList.appendChild(projectItem);

      // Xử lý upload nhiều tệp
      projectItem.querySelector('.file-upload').addEventListener('change', (e) => {
        const uploadedFiles = Array.from(e.target.files);
        project.files.push(...uploadedFiles);
        renderProjectList(); // Hiển thị lại danh sách tệp đã tải lên
      });

      // Xử lý nút Save
      projectItem.querySelector('.save-button').addEventListener('click', () => {
        const progress = projectItem.querySelector('.progress-select').value;
        const level = projectItem.querySelector('.level-select').value;
        const note = projectItem.querySelector('.note-input').value;

        projects[index] = {
          ...projects[index],
          progress,
          level,
          note,
        };
        console.log('Project saved:', projects[index]);
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
        files: [], // Lưu danh sách file
      };
      projects.push(newProject);
      projectNameInput.value = '';
      renderProjectList();
    }
  }

  // Lắng nghe sự kiện click nút Add Project
  addProjectButton.addEventListener('click', addProject);
});
