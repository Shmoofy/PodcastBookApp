export const updateNotification = (updater, text, type = '') => {
    updater({text, type});
    setTimeout(() => {
        updater({text: '', type: ''});
    }, 2500)
}
