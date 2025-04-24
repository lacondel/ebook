// Общая конфигурация для тостов
export const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
}

// Конфигурация для быстрых тостов (предупреждения, подсказки)
export const quickToastConfig = {
    ...toastConfig,
    autoClose: 2000,
}

// Конфигурация для важных тостов (ошибки, подтверждения действий)
export const importantToastConfig = {
    ...toastConfig,
    autoClose: 5000,
} 