const modalBackdrop = document.querySelector('[data-modal-backdrop]');
const consultModal = document.querySelector('[data-consult-modal]');
const modalTitle = document.querySelector('#consult-modal-title');
const modalDesc = document.querySelector('#consult-modal-desc');
const modalModeInput = document.querySelector('[data-modal-mode-input]');
const modalSubmit = document.querySelector('[data-modal-submit]');
const consultForm = document.querySelector('[data-consult-form]');
const formFeedback = document.querySelector('[data-form-feedback]');
const openButtons = Array.from(document.querySelectorAll('[data-modal-open]'));
const closeButtons = Array.from(document.querySelectorAll('[data-modal-close]'));
const modeButtons = Array.from(document.querySelectorAll('[data-modal-mode]'));

const paymentModal = document.querySelector('[data-payment-modal]');
const paymentCloseButtons = Array.from(document.querySelectorAll('[data-payment-close]'));

const modalContent = {
  activate: {
    title: '立即开通',
    description: '留下你的联系方式与场景需求，我们将优先协助你完成试用、套餐开通或 API 接入。',
    submitText: '提交开通申请',
    feedback: '已收到开通申请，我们会尽快与你联系并安排接入。'
  },
  sales: {
    title: '联系销售',
    description: '留下你的预算、场景与部署诉求，我们会安排商务顾问为你提供报价与实施建议。',
    submitText: '提交销售咨询',
    feedback: '已收到销售咨询，我们会尽快安排顾问与你对接。'
  }
};

let currentMode = 'activate';
let lastTrigger = null;

const setModalMode = (mode) => {
  const nextMode = modalContent[mode] ? mode : 'activate';
  currentMode = nextMode;

  if (modalModeInput) {
    modalModeInput.value = nextMode;
  }

  if (modalTitle) {
    modalTitle.textContent = modalContent[nextMode].title;
  }

  if (modalDesc) {
    modalDesc.textContent = modalContent[nextMode].description;
  }

  if (modalSubmit) {
    modalSubmit.textContent = modalContent[nextMode].submitText;
  }

  modeButtons.forEach((button) => {
    const isActive = button.dataset.modalMode === nextMode;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });
};

const openModal = (mode, trigger) => {
  if (mode === 'payment') {
    if (!paymentModal) {
      return;
    }
    lastTrigger = trigger || null;
    paymentModal.hidden = false;
    document.body.style.overflow = 'hidden';
    return;
  }

  if (!modalBackdrop) {
    return;
  }

  lastTrigger = trigger || null;
  setModalMode(mode);
  formFeedback.textContent = '';
  modalBackdrop.hidden = false;
  document.body.style.overflow = 'hidden';

  const firstField = consultForm?.querySelector('input, select, textarea');
  if (firstField instanceof HTMLElement) {
    window.setTimeout(() => {
      firstField.focus();
    }, 20);
  }
};

const closePaymentModal = () => {
  if (!paymentModal) {
    return;
  }
  paymentModal.hidden = true;
  document.body.style.overflow = '';
  if (lastTrigger instanceof HTMLElement) {
    lastTrigger.focus();
  }
};

const closeModal = () => {
  if (!modalBackdrop) {
    return;
  }

  modalBackdrop.hidden = true;
  document.body.style.overflow = '';

  if (lastTrigger instanceof HTMLElement) {
    lastTrigger.focus();
  }
};

openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openModal(button.dataset.modalOpen || 'activate', button);
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', closeModal);
});

paymentCloseButtons.forEach((button) => {
  button.addEventListener('click', closePaymentModal);
});

modeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setModalMode(button.dataset.modalMode || 'activate');
  });
});

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', (event) => {
    if (event.target === modalBackdrop) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (paymentModal && !paymentModal.hidden) {
      closePaymentModal();
    } else if (modalBackdrop && !modalBackdrop.hidden) {
      closeModal();
    }
  }
});

if (consultForm) {
  consultForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(consultForm);
    const name = String(formData.get('name') || '').trim();
    const contact = String(formData.get('contact') || '').trim();

    if (!name || !contact) {
      formFeedback.textContent = '请先完整填写姓名和联系方式。';
      return;
    }

    formFeedback.textContent = modalContent[currentMode].feedback;
    consultForm.reset();
    setModalMode(currentMode);

    window.setTimeout(() => {
      closeModal();
    }, 1200);
  });
}

setModalMode(currentMode);
