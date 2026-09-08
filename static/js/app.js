/*
  MailSense frontend logic.

  Everything here works against an in memory array of mail objects, so a
  Python backend can update the dashboard without a page reload. Two ways
  to feed it real data:

    1. Polling: fetch your endpoint on an interval and call
       MailSense.setEmails(list) with the full, fresh list each time.

    2. Push: open a WebSocket or SSE connection and call
       MailSense.addEmail(mail) for each new message, or
       MailSense.updateEmail(id, changes) when a message's priority or
       read state changes after classification.

  A mail object looks like this:
  {
    id: 'unique-id',
    sender: 'Sender name',
    subject: 'Subject line',
    preview: 'Short one line summary shown only in the detail view context',
    body: 'Full message content',
    time: '9:30AM',
    day: 'Today',            // any label works, e.g. a real date string
    priority: 'high',        // 'high' | 'medium' | 'low'
    read: false
  }
*/

(function () {
  const state = {
    emails: [...DEMO_EMAILS],
    filter: 'all',
    openId: null
  };

  const els = {
    sidebar: document.getElementById('sidebar'),
    backdrop: document.getElementById('sidebar-backdrop'),
    openSidebarBtn: document.getElementById('open-sidebar'),
    closeSidebarBtn: document.getElementById('close-sidebar'),
    sideNav: document.getElementById('side-nav'),
    listTitle: document.getElementById('list-title'),
    mailList: document.getElementById('mail-list'),
    listView: document.getElementById('list-view'),
    detailView: document.getElementById('detail-view'),
    mailDetail: document.getElementById('mail-detail'),
    backToList: document.getElementById('back-to-list')
  };

  const PRIORITY_LABEL = { high: 'High priority', medium: 'Medium priority', low: 'Low priority' };
  const PRIORITY_DOT = { high: 'bg-high', medium: 'bg-medium', low: 'bg-low' };

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function filteredEmails() {
    if (state.filter === 'all') return state.emails;
    return state.emails.filter((m) => m.priority === state.filter);
  }

  function groupByDay(emails) {
    const groups = new Map();
    emails.forEach((mail) => {
      if (!groups.has(mail.day)) groups.set(mail.day, []);
      groups.get(mail.day).push(mail);
    });
    return groups;
  }

  function renderList() {
    const emails = filteredEmails();
    els.mailList.innerHTML = '';

    if (emails.length === 0) {
      els.mailList.innerHTML = `
        <div class="flex flex-col items-center justify-center text-center py-24">
          <div class="h-11 w-11 rounded-full border border-border flex items-center justify-center text-faint mb-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/></svg>
          </div>
          <p class="text-[15px] font-medium text-muted">Nothing here yet</p>
          <p class="text-[13px] text-faint mt-1">Messages at this priority will show up as they come in.</p>
        </div>`;
      return;
    }

    const groups = groupByDay(emails);
    groups.forEach((mails, day) => {
      const section = document.createElement('div');
      section.className = 'mb-2';

      const heading = document.createElement('p');
      heading.className = 'px-2 md:px-3 py-2 text-[13px] font-semibold text-#225C09 border-b border-ink/10';
      heading.textContent = day;
      section.appendChild(heading);

      mails.forEach((mail) => {
        const row = document.createElement('button');
        row.type = 'button';
        row.dataset.id = mail.id;
        row.className = `mail-row mail-row--${mail.read ? 'read' : 'unread'} w-full flex items-center gap-4 px-2 md:px-3 py-2.5 text-left border-b border-#225C09/10`;
        row.innerHTML = `
          <span class="h-3.5 w-3.5 rounded-sm ${PRIORITY_DOT[mail.priority]} shrink-0"></span>
          <span class="w-40 md:w-56 shrink-0 truncate text-[15px] mail-row__sender">${escapeHtml(mail.sender)}</span>
          <span class="flex-1 min-w-0 truncate text-[15px] mail-row__subject">${escapeHtml(mail.subject)}</span>
          <span class="shrink-0 text-[13px] text-#555 w-16 text-right">${escapeHtml(mail.time)}</span>
        `;
        row.addEventListener('click', () => openMail(mail.id));
        section.appendChild(row);
      });

      els.mailList.appendChild(section);
    });
  }

  function renderDetail(mail) {
    els.mailDetail.innerHTML = `
      <div class="view-fade max-w-2xl">
        <div class="flex items-center gap-2 mb-4">
          <span class="h-2.5 w-2.5 rounded-sm ${PRIORITY_DOT[mail.priority]} shrink-0"></span>
          <span class="text-[13px] font-medium text-ink">${PRIORITY_LABEL[mail.priority]}</span>
        </div>
        <h2 class="text-[24px] font-bold tracking-tight mb-5">${escapeHtml(mail.subject)}</h2>
        <div class="flex items-center gap-3 pb-5 mb-6 border-b border-border">
          <div class="h-10 w-10 rounded-full bg-panelmuted flex items-center justify-center text-20px font-bold shrink-0">
            ${escapeHtml(mail.sender.trim().charAt(0).toUpperCase() || '?')}
          </div>
          <div class="min-w-0">
            <p class="text-[15px] font-medium truncate">${escapeHtml(mail.sender)}</p>
            <p class="text-[13px] text-#555555">${escapeHtml(mail.day)} at ${escapeHtml(mail.time)}</p>
          </div>
        </div>
        <p class="text-[15px] leading-7 text-#555555 whitespace-pre-line">${escapeHtml(mail.body)}</p>
      </div>
    `;
  }

  function openMail(id) {
    const mail = state.emails.find((m) => m.id === id);
    if (!mail) return;

    mail.read = true;
    state.openId = id;

    renderDetail(mail);
    els.listView.classList.add('hidden');
    els.detailView.classList.remove('hidden');
    els.detailView.classList.add('flex');
    renderList();
  }

  function closeMail() {
    state.openId = null;
    els.detailView.classList.add('hidden');
    els.detailView.classList.remove('flex');
    els.listView.classList.remove('hidden');
  }

  function setFilter(filter) {
    state.filter = filter;

    els.sideNav.querySelectorAll('[data-nav]').forEach((btn) => {
      btn.classList.toggle('nav-item--active', filter === 'all' && btn.dataset.nav === 'all');
    });
    els.sideNav.querySelectorAll('[data-priority]').forEach((btn) => {
      btn.classList.toggle('priority-item--active', btn.dataset.priority === filter);
    });

    els.listTitle.textContent = filter === 'all' ? 'All Inboxes' : PRIORITY_LABEL[filter];
    renderList();
  }

  function openSidebar() {
    els.sidebar.classList.remove('-translate-x-full');
    els.backdrop.classList.remove('hidden');
  }

  function closeSidebar() {
    els.sidebar.classList.add('-translate-x-full');
    els.backdrop.classList.add('hidden');
  }

  // Wiring
  els.sideNav.querySelector('[data-nav="all"]').addEventListener('click', () => setFilter('all'));
  els.sideNav.querySelectorAll('[data-priority]').forEach((btn) => {
    btn.addEventListener('click', () => setFilter(btn.dataset.priority));
  });
  els.backToList.addEventListener('click', closeMail);
  els.openSidebarBtn.addEventListener('click', openSidebar);
  els.closeSidebarBtn.addEventListener('click', closeSidebar);
  els.backdrop.addEventListener('click', closeSidebar);

  // Initial paint
  renderList();

  // Public API for the backend to push live updates without a page reload
  window.MailSense = {
    setEmails(list) {
      state.emails = Array.isArray(list) ? list : [];
      if (state.openId && !state.emails.some((m) => m.id === state.openId)) closeMail();
      renderList();
      if (state.openId) {
        const mail = state.emails.find((m) => m.id === state.openId);
        if (mail) renderDetail(mail);
      }
    },
    addEmail(mail) {
      state.emails.unshift(mail);
      renderList();
    },
    updateEmail(id, changes) {
      const mail = state.emails.find((m) => m.id === id);
      if (!mail) return;
      Object.assign(mail, changes);
      renderList();
      if (state.openId === id) renderDetail(mail);
    },
    removeEmail(id) {
      state.emails = state.emails.filter((m) => m.id !== id);
      if (state.openId === id) closeMail();
      renderList();
    }
  };
})();
