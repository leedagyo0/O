// 로그인 확인
function checkPassword() {
  const passwordInput = document.getElementById('password').value;
  const correctPassword = '090921';
  if (passwordInput === correctPassword) {
    window.location.href = 'diary.html';
  } else {
    document.getElementById('error-message').textContent = '비밀번호가 틀렸습니다.';
  }
}

// 여러 개의 일기 저장 및 관리 (이미지 포함)
let entries = JSON.parse(localStorage.getItem('entries')) || {};

window.onload = function() {
  displayEntries();
};

function saveEntry() {
  const title = document.getElementById('entryTitle').value;
  const content = document.getElementById('diaryContent').value;
  const imageUploader = document.getElementById('imageUploader');
  
  if (title && content) {
    const reader = new FileReader();
    reader.onload = function(e) {
      entries[title] = { content, image: e.target.result };
      localStorage.setItem('entries', JSON.stringify(entries));
      displayEntries();
      document.getElementById('status-message').textContent = '일기가 저장되었습니다!';
    };
    if (imageUploader.files[0]) {
      reader.readAsDataURL(imageUploader.files[0]);
    } else {
      entries[title] = { content, image: null };
      localStorage.setItem('entries', JSON.stringify(entries));
      displayEntries();
      document.getElementById('status-message').textContent = '일기가 저장되었습니다!';
    }
  } else {
    alert('제목과 내용을 입력하세요!');
  }
}

function displayEntries() {
  const entryList = document.getElementById('entryList');
  entryList.innerHTML = '';
  for (let title in entries) {
    const card = document.createElement('div');
    card.className = 'entry-card';
    card.innerHTML = `<h3>${title}</h3>`;
    if (entries[title].image) {
      card.innerHTML += `<img src="${entries[title].image}" alt="첨부 이미지">`;
    }
    card.onclick = () => {
      document.getElementById('entryTitle').value = title;
      document.getElementById('diaryContent').value = entries[title].content;
    };
    entryList.appendChild(card);
  }
}
