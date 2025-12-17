// Basic site interactions and department data (offline)
document.getElementById('year').textContent = new Date().getFullYear();

// NAV toggle (mobile)
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Department data (all core engineering departments)
const departments = [
  {
    id: 'ce',
    title: 'Computer Engineering',
    img: 'images/dept-ce.svg',
    location: 'Main Academic Block — 2nd Floor',
    facilities: 'Computer Labs, Programming Labs, Project Rooms',
    desc: 'Focus on programming, data structures, systems, networks and software development.'
  },
  {
    id: 'it',
    title: 'Information Technology (IT)',
    img: 'images/dept-it.svg',
    location: 'Main Academic Block — 1st Floor',
    facilities: 'IT Labs, Networking Lab, Project Labs',
    desc: 'Covers software engineering, web technologies, databases and networking.'
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence & Data Science',
    img: 'images/dept-ai.svg',
    location: 'Innovation Wing / Lab Block',
    facilities: 'AI Lab, GPUs, Data Science Workstations',
    desc: 'Courses on machine learning, deep learning, NLP and data analytics.'
  },
  {
    id: 'mech',
    title: 'Mechanical Engineering',
    img: 'images/dept-mech.svg',
    location: 'Mechanical Block',
    facilities: 'Thermodynamics Lab, Workshop, CAD/ CAM Labs',
    desc: 'Mechanical systems, manufacturing processes, strength of materials and design.'
  },
  {
    id: 'extc',
    title: 'Electronics & Telecommunication (EXTC)',
    img: 'images/dept-extc.svg',
    location: 'Electronics Block',
    facilities: 'Circuit Labs, Communication Lab, PCB Workshop',
    desc: 'Analog/digital electronics, communication systems, embedded systems.'
  },
  {
    id: 'civil',
    title: 'Civil Engineering',
    img: 'images/dept-civil.svg',
    location: 'Civil Dept. — Lab Block',
    facilities: 'Survey Lab, Material Testing Lab, Structural Lab',
    desc: 'Construction, structural analysis, hydraulics and environment engineering.'
  },
  {
    id: 'mecha',
    title: 'Mechatronics / Robotics',
    img: 'images/dept-mechatronics.svg',
    location: 'Robotics Lab / Workshop',
    facilities: 'Robotics Kits, Embedded Systems, Control Lab',
    desc: 'Blends mechanical, electronics and control systems with programming for robotics.'
  },
  {
    id: 'fye',
    title: 'First Year Engineering (FYE)',
    img: 'images/dept-fye.svg',
    location: 'First Year Block',
    facilities: 'Foundation Labs, Physics & Chemistry Labs, Basic Engineering Workshops',
    desc: 'Common foundational subjects for all engineering students in the first year.'
  }
];

// Render department cards
const deptGrid = document.getElementById('deptGrid');

function renderDepartments(list){
  deptGrid.innerHTML = '';
  list.forEach(d => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${d.img}" alt="${d.title}">
      <h4>${d.title}</h4>
      <p class="meta">${d.location}</p>
      <p>${d.desc.length>120 ? d.desc.slice(0,120)+'...' : d.desc}</p>
      <div style="margin-top:10px;">
        <button class="btn" data-id="${d.id}">View Details</button>
        <button class="btn ghost" onclick="scrollToMap()">Locate on Map</button>
      </div>
    `;
    deptGrid.appendChild(card);
  });

  // attach click handlers for details
  document.querySelectorAll('.card .btn').forEach(btn=>{
    btn.addEventListener('click', ()=> openModal(departments.find(x=>x.id===btn.dataset.id)));
  });
}

renderDepartments(departments);

// Search
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', ()=>{
  const q = searchInput.value.trim().toLowerCase();
  if(!q){ renderDepartments(departments); return; }
  const filtered = departments.filter(d => d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q));
  renderDepartments(filtered);
});

// Modal
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalLocation = document.getElementById('modalLocation');
const modalFacilities = document.getElementById('modalFacilities');
const modalClose = document.getElementById('modalClose');

function openModal(dept) {
  modalImg.src = dept.img;
  modalImg.alt = dept.title;
  modalTitle.textContent = dept.title;
  modalDesc.textContent = dept.desc;
  modalLocation.textContent = dept.location;
  modalFacilities.textContent = dept.facilities || '—';
  modal.setAttribute('aria-hidden','false');
}
modalClose.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
modal.addEventListener('click', (e)=> { if(e.target===modal) modal.setAttribute('aria-hidden','true') });

function scrollToMap(){
  document.querySelector('#map').scrollIntoView({behavior:'smooth'});
}
