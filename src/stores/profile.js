import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '../routes'

const fakeUser = {
  name: 'Shegerd',
  lastName: 'academy',
  email: 'shegerd@gmail.com',
  registerDate: "2022-03-25",
  imageUrl: ''
}
window.localStorage.getItem('user') ? window.localStorage.getItem('user') : window.localStorage.setItem('user', JSON.stringify(fakeUser))

const useProfileStore = defineStore('profile', () => {
  const infoFromLocalStorage = JSON.parse(window.localStorage.getItem('user'))
  const user = ref(infoFromLocalStorage)
  const tempUser = ref(null)
  const editLoading = ref(false)
  const emailCodeLoading = ref(false)
  const showModal = ref(false)
  const confirmEmailStep = ref(true)

  const userRegisterDate = computed(() => {
    return (new Date(user.value.registerDate)).toLocaleString()
  })

  const openModal = () => {
    showModal.value = true
    confirmEmailStep.value = true
    emailCodeLoading.value = false
  }
  const closeModal = () => {
    tempUser.value = user.value
    showModal.value = false
    confirmEmailStep.value = true
    emailCodeLoading.value = false
  }
  const changeEmailAddress = () => {
    confirmEmailStep.value = false
  }
  const sendConfirmationCode = () => {
    setTimeout(() => {
      showModal.value = false
      editUser()
    }, 2000)
    emailCodeLoading.value = true
  }

  const editUser = () => {
    setTimeout(() => {
      router.push({ name: 'Home' })
      editLoading.value = false
    }, 2000)
    window.localStorage.setItem('user', JSON.stringify(tempUser.value))
    user.value = tempUser.value
    editLoading.value = true
  }
  return {
    user, tempUser, userRegisterDate, editLoading, confirmEmailStep, emailCodeLoading, showModal,
    openModal, editUser, closeModal, sendConfirmationCode, changeEmailAddress
  }
})

export default useProfileStore