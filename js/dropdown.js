function initCustomDropdowns(root = document) {
  root.querySelectorAll('select.hv-select:not([data-dropdown-ready])').forEach(buildCustomDropdown);
}

function buildCustomDropdown(select) {
  select.dataset.dropdownReady = 'true';

  const wrapper = document.createElement('div');
  wrapper.className = 'hv-dropdown';

  const triggerId = `${select.id || select.name || 'select'}-trigger`;
  const menuId = `${select.id || select.name || 'select'}-menu`;

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'hv-dropdown__trigger';
  trigger.id = triggerId;
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', menuId);

  const label = document.createElement('span');
  label.className = 'hv-dropdown__label';

  const chevron = document.createElement('i');
  chevron.className = 'bi bi-chevron-down hv-dropdown__chevron';
  chevron.setAttribute('aria-hidden', 'true');

  trigger.append(label, chevron);

  const menu = document.createElement('div');
  menu.className = 'hv-dropdown__menu';
  menu.id = menuId;
  menu.setAttribute('role', 'listbox');

  const parent = select.parentNode;
  parent.insertBefore(wrapper, select);
  wrapper.append(select, trigger, menu);

  select.classList.add('hv-dropdown__native');
  if (select.id) trigger.setAttribute('aria-labelledby', select.labels?.[0]?.id || select.id);

  const state = { focusedIndex: -1, optionButtons: [] };

  const getEnabledOptions = () =>
    [...select.options].filter((opt) => !opt.disabled && opt.value !== '');

  const close = () => {
    wrapper.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    state.focusedIndex = -1;
    state.optionButtons.forEach((btn) => btn.classList.remove('is-focused'));
  };

  const open = () => {
    document.querySelectorAll('.hv-dropdown.is-open').forEach((el) => {
      if (el !== wrapper) el.classList.remove('is-open');
    });
    wrapper.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    const selectedIdx = state.optionButtons.findIndex((btn) => btn.classList.contains('is-selected'));
    const focusIdx = selectedIdx >= 0 ? selectedIdx : 0;
    if (state.optionButtons[focusIdx]) {
      state.focusedIndex = focusIdx;
      state.optionButtons[focusIdx].classList.add('is-focused');
      state.optionButtons[focusIdx].scrollIntoView({ block: 'nearest' });
    }
  };

  const renderOptions = () => {
    menu.innerHTML = '';
    state.optionButtons = [];

    [...select.options].forEach((opt) => {
      if (opt.disabled && !opt.value) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hv-dropdown__option';
      btn.setAttribute('role', 'option');
      btn.textContent = opt.textContent.trim();
      btn.dataset.value = opt.value;
      btn.disabled = opt.disabled;

      if (opt.selected && opt.value) btn.classList.add('is-selected');
      if (select.value === opt.value && opt.value) btn.classList.add('is-selected');

      btn.addEventListener('click', () => {
        if (opt.disabled || !opt.value) return;
        select.value = opt.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        syncCustomDropdown(select);
        close();
        trigger.focus();
      });

      state.optionButtons.push(btn);
      menu.appendChild(btn);
    });
  };

  const syncLabel = () => {
    const selected = select.options[select.selectedIndex];
    const hasValue = selected && selected.value && !selected.disabled;

    label.textContent = hasValue ? selected.textContent.trim() : (select.dataset.placeholder || 'Selecciona una opción');
    label.classList.toggle('is-placeholder', !hasValue);

    state.optionButtons.forEach((btn) => {
      btn.classList.toggle('is-selected', btn.dataset.value === select.value && select.value !== '');
    });
  };

  trigger.addEventListener('click', () => {
    wrapper.classList.contains('is-open') ? close() : open();
  });

  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!wrapper.classList.contains('is-open')) open();
      else if (e.key === 'ArrowDown' && state.optionButtons.length) {
        state.optionButtons[state.focusedIndex]?.classList.remove('is-focused');
        state.focusedIndex = Math.min(state.focusedIndex + 1, state.optionButtons.length - 1);
        state.optionButtons[state.focusedIndex].classList.add('is-focused');
        state.optionButtons[state.focusedIndex].scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'ArrowUp' && wrapper.classList.contains('is-open')) {
      e.preventDefault();
      state.optionButtons[state.focusedIndex]?.classList.remove('is-focused');
      state.focusedIndex = Math.max(state.focusedIndex - 1, 0);
      state.optionButtons[state.focusedIndex].classList.add('is-focused');
      state.optionButtons[state.focusedIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && wrapper.classList.contains('is-open') && state.focusedIndex >= 0) {
      e.preventDefault();
      state.optionButtons[state.focusedIndex].click();
    } else if (e.key === 'Escape') {
      close();
    }
  });

  select.addEventListener('change', syncLabel);
  select.form?.addEventListener('reset', () => {
    setTimeout(() => {
      renderOptions();
      syncLabel();
    }, 0);
  });

  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) close();
  });

  renderOptions();
  syncLabel();
  select._hvDropdown = { wrapper, sync: () => { renderOptions(); syncLabel(); } };
}

function syncCustomDropdown(select) {
  if (!select) return;
  if (select._hvDropdown) select._hvDropdown.sync();
  else if (select.tagName === 'SELECT') {
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

function setCustomDropdownValue(select, value) {
  if (!select) return;
  select.value = value;
  syncCustomDropdown(select);
  select.dispatchEvent(new Event('change', { bubbles: true }));
}
